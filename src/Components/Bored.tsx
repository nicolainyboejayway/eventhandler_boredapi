import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface PercentageProps {
  percentage: number;
}

const MainDiv = styled.div`
  display: grid;
  color: white;
  justify-content: center;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const Text2 = styled.h2``;
const Text3 = styled.h3``;

const PercentageWrapper = styled.div`
  display: flex;
  justify-content: center;
  &::after {
    content: "It Takes An Effort";
    margin: auto;
    padding-left: 1rem;
    font-size: 0.8rem;
  }
  &::before {
    content: "Just Do It";
    font-size: 0.8rem;
    margin: auto;
    padding-right: 1rem;
  }
`;

const Container = styled.div`
  width: 50%;
  display: grid;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding-top: 1rem;
  top: 25%;
  left: 25%;
  z-index: 60;
`;

const Card = styled.div`
  transform-style: preserve-3d;
  background: linear-gradient(
    to bottom,
    rgba(0, 162, 255, 0.6),
    rgba(115, 227, 255, 0.6)
  );
  min-height: 20vh;
  width: 30rem;
  border-radius: 1rem;
  padding: 2rem 2rem;

  box-shadow: 0 0.6rem 1rem rgba(132, 239, 247, 0.2),
    0rem 0rem 1rem rgba(0, 174, 255, 0.1);
`;

const MainDivPercentage = styled.div`
  width: 20rem;
  height: 2rem;

  background: linear-gradient(
    to right,
    rgba(221, 233, 245, 0.5),
    rgba(93, 245, 113, 0.5)
  );
`;

const HowHardIsItDiv = styled.div<PercentageProps>`
  width: ${(props) => props.percentage + "%"};
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(161, 211, 163, 0.9),
    rgba(93, 189, 245, 0.9)
  );
`;

export default function Bored() {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoad] = useState(true);
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [accessibility, setAccessibility] = useState(0);

  useEffect(() => {
    fetch("http://www.boredapi.com/api/activity/")
      .then((results) => results.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (items.length !== 0) {
      setLoad(false);
    }
    setActivity(Object.values(items)[0]);
    setAccessibility(Object.values(items)[6]);
    setType(Object.values(items)[1]);
  }, [items]);

  return (
    <div>
      <MainDiv>
        <Container>
          <Card>
            <Text2>{activity}</Text2>
            <Text3>{type}</Text3>
            <Text3> Effort counter: {accessibility}</Text3>
            <PercentageWrapper>
              <MainDivPercentage>
                <HowHardIsItDiv percentage={accessibility * 100} />
              </MainDivPercentage>
            </PercentageWrapper>
          </Card>
        </Container>
      </MainDiv>
    </div>
  );
}
