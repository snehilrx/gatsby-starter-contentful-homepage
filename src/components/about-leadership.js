import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  FlexList,
  Heading,
  Section,
  Text,
  Box,
  Kicker,
  Space,
} from "./ui"

function AboutProfile(props) {
  return (
    <Box width="third" padding={4} center>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image.gatsbyImageData)}
        />
      )}
      <Space size={3} />
      <Box>
        {props.name && (
          <Text variant="medium" bold center dangerouslySetInnerHTML={{ __html: props.name }}>
          </Text>
        )}
        {props.jobTitle && (
          <Text variant="medium" center>
            {props.jobTitle}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default function AboutLeadership(props) {
  const dyan = {
    name: "Dr. R Sumathi<div class=\"ui_text_kicker__ur0mb4w\"><br/><small>Professor<br/>Dept. of CSE</small></div>",
    jobTitle: "Panel Convener"
  }

  const churail = {
    name: "Mrs. Shwetha A N<div class=\"ui_text_kicker__ur0mb4w\"><br/><small>Assistant Professor<br/>Dept. of CSE</small></div>",
    jobTitle: "Panel Convener"
  }
  
  return (
    <Section>
      <Container width="full">
        <Box center paddingY={4}>
          <Heading as="h1">{"Guide"}</Heading>
        </Box>
        <FlexList gap={0} variant="center" alignItems="start">
          <AboutProfile key={"DYAEN"} {...dyan} />
          <AboutProfile key={"CHURAIL"} {...churail} />
        </FlexList>
      </Container>
      <Container width="tight">
        <Box center paddingY={4}>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading as="h1">{props.heading}</Heading>}
        </Box>
        <FlexList gap={0} variant="center" alignItems="start">
          {props.content.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment AboutLeadershipContent on AboutLeadership {
    id
    kicker
    heading
    subhead
    content {
      id
      name
      jobTitle
      image {
        gatsbyImageData
        alt
      }
    }
  }
`
