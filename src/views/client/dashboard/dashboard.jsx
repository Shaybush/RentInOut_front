import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useScroll } from "../../../hooks/useScroll";
import { clearPosts, getPosts } from "../../../redux/features/postsSlice";
import Card from "../../../shared/components/card";
import LoadingCard from "../../../shared/components/loadingComponents/loadingCard";
import CreatePostAlternative from "./components/createPostAlternative";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postsSlice);
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [onAdd, setOnAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [endScreen, endScreenEnd] = useScroll(900);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (user?.role === "admin") nav("/admin", { replace: true });
    return () => {
      dispatch(clearPosts());
    };
  }, [user]);

  useEffect(() => {
    setPage(1);
    dispatch(clearPosts());
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch, searchParams]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPosts({ page, endScreenEnd, setPage, searchParams }));
    }, 100);
  }, [endScreen, searchParams]);

  return (
    <main className="min-h-screen md:p-3 text-center justify-center">
      {/* add new post button */}
      {!loading && user && (
        <div className="p-3 space-x-1 w-full mx-auto rounded-xl drop-shadow-xlfixed top-2 left-2">
          {!onAdd ? (
            // unhide button
            <div className="flex justify-center mt-2 mb-8">
              <button
                className="btn cursor-pointer bg-blue-300 text-gray-900 rounded-full w-1/2  inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-500"
                type="button"
                onClick={() => setOnAdd(true)}
              >
                Add New Post
              </button>
            </div>
          ) : (
            <CreatePostAlternative setOnAdd={setOnAdd} />
          )}
        </div>
      )}

      {/* all posts */}
      <div
        id="posts"
        className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-4 md:grid-cols-3 2xl:grid-cols-4 mx-auto mt-3"
      >
        {posts && posts?.map((post) => <Card post={post} key={post._id} />)}

        {/* loading card */}
        {loading && <LoadingCard cards={8} />}
      </div>
    </main>
  );
};
export default Dashboard;
