import React from "react";
import styled from "styled-components";
import { variantName, variant, defaultVariants } from "../styles/variants";

const _Button = styled.button<{variant: variant}>`
  border-radius: 30px 30px;
  border-style: solid;
  border-color: #333;
  font-family: "Heebo";
  font-weight: 600;
  font-size: 16px;
  padding: 15px 35px 15px 35px;
  cursor: pointer;
  background: none;
  color: #222222;
  transition: linear 0.08s;
  outline: 0;

  background: ${(p) => p.variant.background};
  border-color: ${(p) => p.variant.borderColor};

  :hover {
    opacity: 0.5;
    transition: cubic-bezier(0.13, 0.91, 0.37, 1) 0.3s;
  }
`;

type ButtonProps = {
    text: string,
    variant?: variantName
}

export const Button = ({text, variant="github"}: ButtonProps) => {
    return <_Button variant={defaultVariants[variant]}>{text}</_Button>
}