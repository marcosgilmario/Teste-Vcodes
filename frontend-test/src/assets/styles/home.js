import styled from "styled-components";

export const View = styled.div`
  margin-top: 10vh;
`;

export const Row = styled.div`
  display: flex;
  grid-template-rows: 50px 50px;
  grid-gap: 5px;
`;

export const Column = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;

export const DestroySearch = styled.button`
  color: white;
  background-color: transparent;
  border: 0;
  font-size: 24px;
  margin-left: -40px;
  margin-right: 20px;
`;
