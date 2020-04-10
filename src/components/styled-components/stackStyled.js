import styled from "styled-components";

const MODAL_PADDING = 0;

export const Modal = styled.div`
  position: fixed;
  width: 300px;
  left: calc(50% - ${150 + MODAL_PADDING}px);
  top: 50%;
  padding: ${MODAL_PADDING}px;
  background: grey;
  z-index: 20;
`;
