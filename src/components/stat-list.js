import React, { Component } from 'react'
import { graphql } from "gatsby"
import {
  Container,
  Section,
  Text,
  Kicker,
  Heading,
  Flex,
  Box,
  Icon,
  ButtonList,
  cx,
  Nudge,
  Button,
  VisuallyHidden,
} from "./ui"
import * as styles from "./ui.css"

function Hidden(props) {
  return !props.visible ? <div style={{ visibility: "hidden" }}>{props.children}</div> : props.children;
}

export default class StatList extends Component {

  state = {
    isVisible: true
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this;
    return (
      <Container width="fullbleed" margin={5} style={{ position: "relative" }}>
        <div style={{
          width: "100%",
          padding: "0 32px",
          inset: 0,
          position: "absolute",
          zIndex: "-1",
          height: "100%"
        }}>
          <video id="vid" style={{
            width: "100%",
            borderRadius: "var(--radii-large__wuwu9p1g)"
          }}>
            <source src={props.image.url} type="video/mp4" />
          </video>
          <audio id="aud" src={props.icon.url} />
        </div>
        <Section padding={3} radius="large"  >
          <Flex responsive variant="end">
            <Nudge top={-6} left={-6}>
              <Hidden visible={this.state.isVisible}>
                <Box width="half" style={{ color: "var(--colors-muted__wuwu9p3)" }}>
                  <Heading>
                    {props.kicker && <Kicker>{props.kicker}</Kicker>}
                    {props.heading}
                  </Heading>
                  {props.text && <Text variant="lead">{props.text}</Text>}
                  <ButtonList links={props.links} reversed />
                  <Button variant={"reversed"} onClick={(e) => {
                    e.preventDefault(); document.getElementById("vid").play();
                    document.getElementById("aud").play();
                    this.setState({ isVisible: false })
                  }}>PLAY</Button>
                </Box>
              </Hidden>
              <Hidden visible={!this.state.isVisible}>
                <Button variant={"reversed"} onClick={(e) => {
                  e.preventDefault(); 
                  var video = document.getElementById("vid");
                  var audio = document.getElementById("aud");
                  video.pause();
                  video.currentTime = 0;
                  audio.pause();
                  audio.currentTime = 0;
                  this.setState({ isVisible: true })
                }}>STOP</Button>
              </Hidden>
            </Nudge>
          </Flex>
        </Section>
      </Container >
    )
  }
}



export const query = graphql`
  fragment HomepageStatListContent on HomepageStatList {
    id
    kicker
    heading
    text
    image {
      url
    }
    icon {
      url
    }
    content {
      id
      value
      label
      heading
    }
    links {
      id
      href
      text
    }
  }
`
