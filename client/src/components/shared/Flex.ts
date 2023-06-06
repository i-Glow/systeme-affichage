import styled from "styled-components";

type params = {
  direction?: string;
  wrap?: boolean;
  ai?: string;
  jc?: string;
  w?: string;
  h?: string;
  gap?: string;
  m?: string;
  p?: string;
  mt?: string;
  mb?: string;
  mr?: string;
  ml?: string;
  mw?: string;
  mh?: string;
};

export default styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ direction }: params) =>
    direction === "v" ? "column" : "row"};
  flex-wrap: ${({ wrap }: params) => (wrap ? "wrap" : "no-wrap")};
  align-items: ${({ ai }: params) => (ai ? ai : "center")};
  justify-content: ${({ jc }: params) => (jc ? jc : "center")};
  width: ${({ w }: params) => w};
  min-width: ${({ mw }: params) => mw};
  height: ${({ h }: params) => h};
  min-height: ${({ mh }: params) => mh};
  gap: ${({ gap }: params) => gap};
  margin-top: ${({ mt }: params) => mt};
  margin-bottom: ${({ mb }: params) => mb};
  margin-right: ${({ mr }: params) => mr};
  margin-left: ${({ ml }: params) => ml};
  margin: ${({ m }: params) => m};
  padding: ${({ p }: params) => p};
`;
