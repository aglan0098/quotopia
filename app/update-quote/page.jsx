"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateQuote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ quote: "", tag: "" });

  useEffect(() => {
    const getQuoteDetails = async () => {
      const response = await fetch(`/api/quote/${quoteId}`);
      const data = await response.json();

      setPost({
        quote: data.quote,
        tag: data.tag,
      });
    };

    if (quoteId) getQuoteDetails();
  }, [quoteId]);

  const updateQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!quoteId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/quote/${quoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default UpdateQuote;
