import React from "react";
import SectionBox from "../../../common/Section/SectionBox";
import Head3 from "../../../common/Heading/Head3";
import ItemSlider from "../../../partials/ItemSlider/ItemSlider";
import ButtonSection from "../../../common/Button/ButtonSection";
import Head2 from "../../../common/Heading/Head2";
import useFetch from "../../../../hooks/useFetch";

const Blog = () => {
  const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";

  const postsEndpoint = `${baseURL}/api/posts/`;
  const [posts, isLoadingPosts, postsError] = useFetch(
    postsEndpoint,
    "GET"
  );
  return (
    <SectionBox>
      <Head3> Latest Blog Posts </Head3>
      {postsError && (
        <Head2>Error loading posts: {postsError.message}</Head2>
      )}
      {isLoadingPosts ? (
        <Head2>Loading...</Head2>
      ) : (
        <>
          {posts ? (
            <ItemSlider data={posts} isProduct={false} />
          ) : (
            <Head2>No posts available.</Head2>
          )}
          <ButtonSection path={"/shop"}> Go To Blog </ButtonSection>
        </>
      )}
    </SectionBox>
  );
};

export default Blog;
