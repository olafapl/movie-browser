import styled, { css } from "styled-components";

interface ContainerProps {
  centered?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ theme }) => theme.containerWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space("4")};
  display: flex;
  flex-direction: column;

  ${({ centered }) =>
    centered &&
    css`
      align-items: center;

      && {
        margin: auto;
      }
    `}
`;
