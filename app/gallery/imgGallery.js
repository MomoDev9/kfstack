"use client";
import { useState, useEffect } from "react";

import ImageModal from "./imgModal";
import content from "./content";
import Loading from "../components/loading";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = content.row1.concat(content.row2, content.row3, content.row4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (images.length > 0) {
      setLoading(false);
    }
  }, [images]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center max-w-[screen-2]">
        {content.row1.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className="cursor-pointer bg-slate-700 px-[10%] md:px-[6.8%] mx-1 group hover:bg-slate-600 my-2"
          >
            <img
              src={image.src}
              alt={image.title}
              className="h-52 md:h-44 w-56 md:w-auto object-cover group-hover:scale-125 group-hover:object-fill"
            />
          </div>
        ))}
        {selectedImage !== null && (
          <ImageModal
            image={images[selectedImage]}
            onClose={() => setSelectedImage(null)}
            onNext={() => setSelectedImage((selectedImage + 1) % images.length)}
            onPrevious={() =>
              setSelectedImage(
                (selectedImage - 1 + images.length) % images.length
              )
            }
          />
        )}
      </div>

      <div className="flex items-center justify-center max-w-[screen-2] my-2">
        {content.row2.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index + 3)}
            className="cursor-pointer bg-slate-700 px-[10%] md:px-[35%] mx-1 group hover:bg-slate-600"
          >
            <img
              src={image.src}
              alt={image.title}
              className="h-52 w-56 md:w-auto object-cover group-hover:scale-125 group-hover:object-fill"
            />
          </div>
        ))}
        {selectedImage !== null && (
          <ImageModal
            image={images[selectedImage]}
            onClose={() => setSelectedImage(null)}
            onNext={() => setSelectedImage((selectedImage + 1) % images.length)}
            onPrevious={() =>
              setSelectedImage(
                (selectedImage - 1 + images.length) % images.length
              )
            }
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center  justify-center max-w-[screen]">
        {content.row3.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index + 4)}
            className="cursor-pointer bg-slate-700 mx-1 px-[10%] md:px-[13.5%] group hover:bg-slate-600 my-2"
          >
            <img
              src={image.src}
              alt={image.title}
              className="h-52 md:h-48 w-56 md:w-auto object-cover group-hover:scale-125"
            />
          </div>
        ))}
        {selectedImage !== null && (
          <ImageModal
            image={images[selectedImage]}
            onClose={() => setSelectedImage(null)}
            onNext={() => setSelectedImage((selectedImage + 1) % images.length)}
            onPrevious={() =>
              setSelectedImage(
                (selectedImage - 1 + images.length) % images.length
              )
            }
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center  justify-center max-w-[screen]">
        {content.row4.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index + 6)}
            className="cursor-pointer bg-slate-700 mx-1 px-[10%] md:px-[2%] group hover:bg-slate-600 my-2"
          >
            <img
              src={image.src}
              alt={image.title}
              className="h-52 md:h-36 w-52 md:w-auto object-cover group-hover:scale-125"
            />
          </div>
        ))}
        {selectedImage !== null && (
          <ImageModal
            image={images[selectedImage]}
            onClose={() => setSelectedImage(null)}
            onNext={() => setSelectedImage((selectedImage + 1) % images.length)}
            onPrevious={() =>
              setSelectedImage(
                (selectedImage - 1 + images.length) % images.length
              )
            }
          />
        )}
      </div>
    </>
  );
};

export default Gallery;
