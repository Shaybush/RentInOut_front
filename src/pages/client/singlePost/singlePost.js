import React, { useState, useEffect } from "react";
import { doGetApiMethod } from "../../../services/axios-service/axios-service";
import { Wrapper } from "../../../assets/styles/wrappers/singlePost";
import PostHeader from "../../../shared/components/postHeader/postHeader";
import ImgController from "./imgController";
import Likes from "./../posts-likes/likes";
import UserInfo from "./userInfo";
import PostInfo from "./postInfo";
import PopUPModel from "./../../../shared/UI/popup/popUpSinglePost";
import { onPostToggle } from "../../../redux/features/toggleSlice";
import BallTriangleLoader from "./../../../shared/components/loader/ballTriangle/ballTriangle";
import MapBylocation from "./mapBylocation";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useSelector } from "react-redux";
const SinglePost = ({ post }) => {
  const { user } = useSelector((state) => state.userSlice);
  const [isLoading, setIsLoading] = useState(true);
  const [isChange, setIsChange] = useState(false);
  const [rank, setRank] = useState({});

  useEffect(() => {
    getUserRating();
    doSearchOnMap();
  }, [isChange]);
  /** get rating from api */
  const getUserRating = async () => {
    let url = `/users/getRank/${post?.creator_id._id}?rankingUser=${user?._id}`;
    const { data } = await doGetApiMethod(url);
    setRank(data);
    setIsLoading(false);
  };
  //dummy adresses
  const locations = [
    "תל אביב גלגלי הפלדה 5",
    "תל אביב גלגלי הפלדה 8",
    "תל אביב שדרות אבא אבן 7",
  ];

  const [results, setResults] = useState([]);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  useEffect(() => {}, []);
  const serachProvider = new OpenStreetMapProvider();
  const doSearchOnMap = async () => {
    let results = [];
    locations.map(async (loc, i) => {
      let result = await serachProvider.search({ query: loc });
      results.push(result[0]);
      if (i === 0) setCenter(result[0]);
      setResults((prev) => [...prev, result[0]]);
    });
    // setResults(results);
  };
  return (
    <PopUPModel action={onPostToggle}>
      <Wrapper>
        {isLoading ? (
          <div className="loader w-full flex justify-center items-center h-full">
            <BallTriangleLoader width={"150px"} height={"150px"} />
          </div>
        ) : (
          // images
          <section className="flex flex-wrap">
            <ImgController post={post} />
            {/* post context */}
            <main className="overflow-y-scroll">
              <hr />
              {post && <PostHeader post={post} />}
              <hr />
              <div className="flex flex-wrap mt-2">
                <div className="post-info md:w-1/2 border w-full">
                  <PostInfo post={post} owner={post.creator_id} />
                </div>
                <div className="post-likes md:w-1/2 border w-full">
                  <Likes likes={post?.likes} action={onPostToggle} />
                </div>
              </div>
              <UserInfo
                owner={post.creator_id}
                rank={rank}
                post={post}
                isChange={isChange}
                setIsChange={setIsChange}
              />
              <div className="p-2 overflow-hidden">
                <MapBylocation results={results} center={center} />
              </div>
            </main>
          </section>
        )}
      </Wrapper>
    </PopUPModel>
  );
};

export default SinglePost;
