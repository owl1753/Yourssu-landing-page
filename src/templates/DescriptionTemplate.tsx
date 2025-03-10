import { graphql, Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

import ApplyButton from '@/components/Button/ApplyButton';
import Layout from '@/components/Layout';
import DepartmentSeo from '@/components/Seo/DepartmentSeo';
import ApplyProcedure from '@/containers/description/ApplyProcedure';
import GrowthAndDiff from '@/containers/description/GrowthAndDiff';
import InaWord from '@/containers/description/InaWord';
import Information from '@/containers/description/Information';
// import Medium from '@/containers/description/Medium';
import RoadToPro from '@/containers/description/RoadToPro';
import SideNavigation from '@/containers/description/SideNavigation';
import TeamHeader from '@/containers/description/TeamHeader';
import {
  BasicInformation,
  DefaultContentInformation,
  GrowthAndDiffInformation,
  InaWordInformation,
  MediumInformation,
  RoadToProInformation,
  SkillContentInformation,
} from '@/types/recruiting.type';
import isTodayInRange from '@/utils/isTodayInRange';

const KAKAO_LINK = 'http://pf.kakao.com/_AxfrxeT';

interface SanityDepartmentData {
  allSanityDepartment: {
    edges: {
      node: {
        basicInformation: BasicInformation;
        task: DefaultContentInformation;
        ideal: DefaultContentInformation;
        experience: DefaultContentInformation;
        skill: SkillContentInformation | null;
        roadToProVideo: RoadToProInformation;
        growthAndDiff: GrowthAndDiffInformation;
        inaWord: InaWordInformation;
        articleContent: MediumInformation[];
      };
    }[];
  };
}

interface DescriptionTemplateProps {
  data: SanityDepartmentData;
  pageContext: {
    name: string;
    nameList: string[];
    formSchedule: { start: Date | null; end: Date | null } | null;
    procedure:
      | {
          step: string;
          schedule: string;
        }[]
      | null;
  };
}

function DescriptionTemplate({
  data: {
    allSanityDepartment: { edges },
  },
  pageContext: { name, nameList, formSchedule, procedure },
}: DescriptionTemplateProps) {
  const [isRecruiting, setIsRecruiting] = useState(false);
  const breakpoints = useBreakpoint();

  useEffect(() => {
    if (typeof window !== 'undefined' && formSchedule) {
      const recruiting = isTodayInRange(formSchedule);
      setIsRecruiting(recruiting);
    }
  }, [formSchedule]);

  return (
    <Layout isMainPage={false}>
      <TeamHeader
        name={name}
        basicInformation={edges[0].node.basicInformation}
        isRecruiting={isRecruiting}
      />
      <Container>
        <InnerContainer>
          <SectionContainer>
            <DefaultInformationContainer>
              <Information
                task={edges[0].node.task}
                ideal={edges[0].node.ideal}
                experience={edges[0].node.experience}
                skill={edges[0].node.skill}
              />
              <ApplyProcedure applyProcedure={procedure} />
              <GrowthAndDiff growthAndDiff={edges[0].node.growthAndDiff} />
              <InaWord
                departmentImage={
                  edges[0].node.basicInformation.icon.asset.gatsbyImageData
                }
                inaWord={edges[0].node.inaWord}
              />
            </DefaultInformationContainer>
            <Line />
            <RoadToPro roadToPro={edges[0].node.roadToProVideo} />
            {/*<Medium medium={edges[0].node.articleContent} />*/}
          </SectionContainer>
          {!breakpoints.md && (
            <SideNavigation
              currentTeam={{
                name,
                isRecruiting,
                applyLink: edges[0].node.basicInformation.apply_link,
              }}
              teamList={nameList}
            />
          )}
        </InnerContainer>
        {breakpoints.md && (
          <ApplyButtonContainer>
            <ApplyButton
              link={edges[0].node.basicInformation.apply_link}
              isRecruiting={isRecruiting}
              $testSize="body4"
            />
            <div className="body8 flex flex-row-reverse gap-2 text-gray1-0">
              <Link
                to="/recruiting/#faq"
                className="flex w-fit flex-col items-center"
              >
                <div className="mb-[1px] items-center">FAQ 보러가기</div>
              </Link>
              |
              <a href={KAKAO_LINK} className="flex w-fit flex-col items-center">
                <div className="mb-[1px] items-center">문의하기</div>
              </a>
            </div>
          </ApplyButtonContainer>
        )}
      </Container>
    </Layout>
  );
}

export default DescriptionTemplate;

export function Head({
  data: { allSanityDepartment },
}: {
  data: SanityDepartmentData;
}) {
  const data = allSanityDepartment.edges[0].node.basicInformation;

  return (
    <DepartmentSeo
      title={`${data.short_introduction.replace(/\\n/g, '')} ${data.name}`}
      description={data.long_introduction}
      image={data.icon.asset.gatsbyImageData}
    />
  );
}

export const querySanityDataByName = graphql`
  query querySanityDataByName($name: String) {
    allSanityDepartment(filter: { basicInformation: { name: { eq: $name } } }) {
      edges {
        node {
          basicInformation {
            name
            short_introduction
            long_introduction
            apply_link
            icon {
              asset {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          task {
            title
            content
          }
          ideal {
            title
            content
          }
          experience {
            title
            content
          }
          skill {
            title
            content
            notice
          }
          articleContent {
            url
            title
            description
            image
          }
          roadToProVideo {
            title
            roadToPro_list {
              video_thumbnail {
                asset {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
              presenter {
                presenter_nickname
                presenter_name
              }
              video_link
            }
          }
          growthAndDiff {
            title
            content
          }
          inaWord {
            title
            word
            content
          }
        }
      }
    }
  }
`;

const Container = tw.div`
  bg-white-0

  px-10
  sm:px-5
`;

const InnerContainer = tw.div`
  flex
  gap-[100px]
  lg:gap-[50px]
  md:gap-0
  sm:gap-0
  xs:gap-0

  max-w-[1364px]
  h-fit

  mx-auto
  py-20
  md:py-[50px]
  sm:py-8
  xs:py-8
`;

const SectionContainer = tw.div`
  flex
  flex-1
  flex-col
  gap-[70px]
  md:gap-[50px]
  sm:gap-[50px]
  xs:gap-[50px]
  max-w-full
`;

const DefaultInformationContainer = tw.div`
  flex
  flex-col
  gap-[60px]
  lg:gap-[50px]
  md:gap-[50px]
  sm:gap-[50px]
  xs:gap-[50px]
`;

const Line = tw.hr`
  h-[2px]
  my-4
  border-none
  bg-gray3-0
`;

const ApplyButtonContainer = tw.div`
  sticky
  bottom-0
  gap-3
  
  flex
  flex-col
  
  w-full
  p-5

  bg-gradient-to-t
  from-white-0
  from-80%
  to-transparent
`;
