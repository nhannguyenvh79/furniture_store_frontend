import { useState } from "react";
import adsdata from "../data/adsData";
import { useEffect } from "react";
import { useRef } from "react";
export default function Advertisement() {
  const [modalShow, setModalShow] = useState(true);
  const [index, setIndex] = useState(0);
  const [isRender, setIsRender] = useState(false);
  const autoShowAds = useRef(null);

  useEffect(() => {
    if (!modalShow) {
      autoShowAds.current = setTimeout(() => {
        setModalShow(true);
      }, 60000);
    } else {
      clearTimeout(autoShowAds.current);
    }
    return () => {
      clearTimeout(autoShowAds.current);
    };
  }, [modalShow]);

  useEffect(() => {
    if (isRender && !modalShow) {
      index < adsdata.length - 1 ? setIndex((pre) => pre + 1) : setIndex(0);
    }
  }, [modalShow]);

  useEffect(() => {
    setIsRender(true);
  }, []);

  return (
    <>
      {modalShow && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%",
            zIndex: 999,
            height: "auto",
            width: "auto",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              width: "50px",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            onClick={() => setModalShow(false)}
          >
            X
          </button>
          <img
            style={{
              height: "auto",
              width: "auto",
              maxWidth: "80vw",
            }}
            src={adsdata[index]}
            alt="ads"
          />
        </div>
      )}
    </>
  );
}