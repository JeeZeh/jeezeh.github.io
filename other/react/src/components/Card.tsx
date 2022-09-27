import React, { ReactNode } from "react";
import styled from "styled-components";
import { defaultVariants, variant } from "../styles/variants";
import { Button } from "./Button";

export const Card = styled.div`
  max-width: 400px;
  margin: auto;
  display: grid;
  grid-template-areas:
    "head"
    "body";
  height: auto;
  filter: drop-shadow(0 3px 2px #00000046);
  margin-bottom: 75px;
  margin-left: 50px;
  margin-right: 50px;
`;

const Header = styled.div<{ variant: variant }>`
  grid-area: head;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Heebo", sans-serif;
  height: 120px;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 2px;
  color: whitesmoke;
  border: 0;
  border-radius: 8px 8px 0 0;
  transition: color 0.1s ease-out;

  background: ${(p) => p.variant.background};
  border-color: ${(p) => p.variant.borderColor};
`;

export const CardBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-area: body;
  background-color: rgb(240, 240, 240);
  border: 0;
  border-radius: 0 0 8px 8px;
  font-family: "Heebo", sans-serif;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
  padding: 30px;
`;

type CardHeaderProps = {
  children?: ReactNode;
  variant?: keyof typeof defaultVariants;
};

export const CardHeader = ({
  children,
  variant = "github",
}: CardHeaderProps) => {
  return <Header variant={defaultVariants[variant]}>{children ?? {}}</Header>;
};

export const CardButton = styled(Button)`
  display: block;
  grid-area: body;
  background: none;
  border-width: 2px;
  letter-spacing: 1.5px;
  font-weight: 500;
`;
