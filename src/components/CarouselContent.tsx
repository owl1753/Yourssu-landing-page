import { useEffect, useState } from 'react';
import Img from 'gatsby-image';
import useCarouselDetail from '@/hooks/container/projects/hook';

interface Node {
  childImageSharp: {
    fluid: {
      aspectRatio: number;
      sizes: string;
      base64: string;
      src: string;
      srcSet: string;
    };
  };
}

type CarouselContentProp = {
  className: string;
  currentIndex: number;
  itemsData: Node[];
};

function CarouselContent({
  className,
  currentIndex,
  itemsData,
}: CarouselContentProp) {
  const [isAndroid, setIsAndroid] = useState<boolean>();
  const { data, projectData } = useCarouselDetail();

  useEffect(() => {
    const mobileType = navigator.userAgent.toLowerCase();
    if (mobileType.indexOf('android') > -1) {
      setIsAndroid(true);
    }
    if (mobileType.indexOf('iphone') > -1 || mobileType.indexOf('ipad')) {
      setIsAndroid(false);
    }
  }, []);

  return (
    <div className={className}>
      {currentIndex % 2 !== 0 ? (
        <Img
          className="md:hidden sm:hidden xxl:w-[732px] xl:w-[732px] lg:w-[530px] h-auto"
          fluid={itemsData[currentIndex].childImageSharp.fluid}
        />
      ) : null}
      <div className="flex flex-col justify-center items-start relative md:mb-[10px] sm:mb-[5px]">
        <span className="text-[#000000] opacity-10 font-normal font-NeoEB absolute text-[70px] -top-[75px] left-[5px] leading-[115px] -tracking-[0.03em] sm:text-[48px] sm:-left-[20px] sm:-top-[65px] sm:-tracking-[0.05em] ">
          0{currentIndex + 1}
        </span>
        <div className="flex flex-col px-[50px] sm:px-[10px]">
          <div className="flex flex-row justify-start items-center">
            {/* 여기 작업 중 */}
            <span className=" text-black font-NeoSB text-[36px] sm:text-[24px] leading-[36px] -tracking-[0.01em]">
              {projectData[currentIndex].title}
            </span>
            <div>
              {projectData[currentIndex].link.length === 1 ? (
                <a href={projectData[currentIndex].link[0]}>
                  <object
                    className="w-[26px] h-[26px] ml-[5px] sm:w-[21.46px] sm:h-[18px] cursor-pointer pointer-events-none"
                    data={data.carouselItemData.nodes[3].publicURL}
                  >
                    {data.carouselItemData.nodes[3].name}
                  </object>
                </a>
              ) : null}
              {projectData[currentIndex].link.length === 2 &&
              isAndroid === true ? (
                <a href={projectData[currentIndex].link[0]}>
                  <object
                    className="w-[26px] h-[26px] ml-[5px] sm:w-[21.46px] sm:h-[18px] cursor-pointer pointer-events-none"
                    data={data.carouselItemData.nodes[3].publicURL}
                  >
                    {data.carouselItemData.nodes[3].name}
                  </object>
                </a>
              ) : null}
              {projectData[currentIndex].link.length === 2 &&
              isAndroid === false ? (
                <a href={projectData[currentIndex].link[1]}>
                  <object
                    className="w-[26px] h-[26px] ml-[5px] sm:w-[21.46px] sm:h-[18px] cursor-pointer pointer-events-none"
                    data={data.carouselItemData.nodes[3].publicURL}
                  >
                    {data.carouselItemData.nodes[3].name}
                  </object>
                </a>
              ) : null}
            </div>
          </div>
          <span className=" text-[22px] sm:text-[14px] w-[405px] sm:w-[266px] text-[#525252] leading-[32px] sm:leading-[22px] -tracking-wider font-NeoR mt-[15px] md:mt-5">
            {projectData[currentIndex].description}
          </span>
          {currentIndex === 1 || currentIndex === 3 || currentIndex === 4 ? (
            <div className="mt-[35px] flex flex-col justify-between h-[80px] md:hidden sm:hidden">
              {projectData[currentIndex].list.map((listData) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div className="flex flex-row justify-start items-center ">
                    <img
                      src={data.carouselItemData.nodes[2].publicURL}
                      alt={data.carouselItemData.nodes[2].name}
                    />
                    <p className="text-[24px] ml-[7px] text-[#525252] font-NeoSB leading-[24px] -tracking-wider">
                      {listData}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-[35px] flex flex-col justify-between h-[132px] md:hidden sm:hidden">
              {projectData[currentIndex].list.map((listData) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div className="flex flex-row justify-start items-center ">
                    <img
                      src={data.carouselItemData.nodes[2].publicURL}
                      alt={data.carouselItemData.nodes[2].name}
                    />
                    <p className="text-[24px] ml-[7px] text-[#525252] font-NeoSB leading-[24px] -tracking-wider">
                      {listData}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden sm:hidden">
        {currentIndex % 2 === 0 && currentIndex !== 4 ? (
          <Img
            className="xxl:w-[750px] xl:w-[750px] lg:w-[530px] h-auto"
            fluid={itemsData[currentIndex].childImageSharp.fluid}
          />
        ) : null}
        {currentIndex % 2 === 0 && currentIndex === 4 ? (
          <Img
            className="xxl:w-[750px] xl:w-[750px] lg:w-[550px] h-auto"
            fluid={itemsData[currentIndex].childImageSharp.fluid}
          />
        ) : null}
      </div>
      <div className="xxl:hidden xl:hidden lg:hidden md:mb-[10px] sm:mb-[5px]">
        <Img
          className="md:w-[400px] sm:w-[300px] h-auto"
          fluid={itemsData[currentIndex].childImageSharp.fluid}
        />
      </div>
      <div className="flex flex-col justify-start xxl:hidden xl:hidden lg:hidden w-[405px] sm:w-[266px] md:mb-[10px] sm:mb-[5px]">
        {projectData[currentIndex].list.map((listData) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className="flex flex-row justify-start items-center mb-5">
              <img
                className="sm:w-[18px] sm:h-[18px]"
                src={data.carouselItemData.nodes[2].publicURL}
                alt={data.carouselItemData.nodes[2].name}
              />
              <p className="text-[24px] sm:text-[16px] ml-[7px] text-[#525252] font-NeoSB md:leading-[24px] sm:leading-[16px] -tracking-wider">
                {listData}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarouselContent;
