import React from "react";
import SingleLike from "./singleLike";

const Likes = ({ post }) => {
  return (
    <React.Fragment>
      <h2 className="text-center">Post Likes</h2>
      {post?.likes?.length > 0 ? (
        <ul className="dropdown overflow-y-scroll p-3 h-full w-full mb-3 flex flex-col">
          {post?.likes?.map((item) => {
            return <SingleLike key={item._id} item={item} />;
          })}
        </ul>
      ) : (
        <h2 className="flex items-center justify-center h-full text-center">No Likes yet</h2>
      )}
    </React.Fragment>
  );
};

export default Likes;