import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            setMessage("");
            setSubmitting(true);
            // Ensure we have an authenticated user for creating / updating posts
            if (!userData || !userData.$id) {
                alert("You must be logged in to create or edit a post.");
                setSubmitting(false);
                return;
            }

            if (post) {
                const file = data.image?.[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null;

                if (file && post.featuredImage) {
                    // Best-effort cleanup of old image; ignore failures
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost && dbPost.$id) {
                    setMessage("Post updated! Redirecting...");
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    alert("Post was not updated. Please try again.");
                }
            } else {
                const file = data.image?.[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null;

                if (!file || !file.$id) {
                    alert("Image upload failed. Please try again.");
                    setSubmitting(false);
                    return;
                }

                data.featuredImage = file.$id;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost && dbPost.$id) {
                    setMessage("Post created! Redirecting...");
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    alert("Post was not created. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error while submitting post:", error);
            alert(error?.message || "Something went wrong while saving the post.");
        } finally {
            setSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setPreviewImage(URL.createObjectURL(file));
                        }
                    }}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                {previewImage && (
                    <div className="w-full mb-4">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="rounded-lg border border-gray-200"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full disabled:opacity-50"
                    disabled={submitting}
                >
                    {submitting ? "Saving..." : post ? "Update" : "Submit"}
                </Button>
                {message && (
                    <p className="mt-3 text-sm text-green-600 text-center">{message}</p>
                )}
            </div>
        </form>
    );
}