import styled from "styled-components";

export const CardContent = styled.div`
  width: 100%;
  min-height: 40px;
  margin: auto;
  box-shadow: 0px 8px 60px -10px rgba(13, 28, 39, 0.6);
  background: #fff;
  border-radius: 12px;
  position: relative;
  :active {
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0.1s;
  }
`;

export const CardSubTitle = styled.h1`
  filter: blur(0.2px);
`;

export const CardHeader = styled.div`
  margin-top: 25px;
  text-align: center;
  padding: 0 20px;
  padding-bottom: 40px;
  transition: all 0.3s;
`;
export const PrimaryLabel = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: #6944ff;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 35px;
`;
export const CardItem = styled.div`
  padding: 10px 35px;
  min-width: 150px;
  @media screen and (max-width: 768px) {
    padding: 10px 20px;
    min-width: 120px;
  }
  @media screen and (max-width: 768px) {
    padding: 10px 20px;
    min-width: 120px;
  } ;
`;

export const CardTitle = styled.p`
  font-weight: 700;
  font-size: 27px;
  color: #324e63;
`;

export const SecondaryLabel = styled.p`
  font-weight: 500;
  margin-top: 7px;
`;

export const CardOptions = styled.div`
  display: flex;
  flex-direction: row wrap;
  justify-content: space-evenly;
  justify-items: center;
  width: auto;
  height: auto;
  margin-top: 40px;
  flex-wrap: column wrap;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button.attrs((props) => ({
  className: props.className,
}))`
  background: none;
  border: none;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 19px;
  padding: 15px 40px;
  min-width: 201px;
  border-radius: 50px;
  min-height: 55px;
  color: #fff;
  cursor: pointer;
  backface-visibility: hidden;
  transition: all 0.3s;
  @media screen and (max-width: 768px) {
    min-width: 170px;
    margin: 15px 25px;
    @media screen and (max-width: 576px) {
      min-width: inherit;
      margin: 0;
      margin-bottom: 16px;
      width: 100%;
      max-width: 300px;
      :last-child {
        margin-bottom: 0;
      }
    }
    :focus {
      outline: none !important;
    }
    @media screen and (min-width: 768px) {
      :hover {
        transform: translateY(-5px);
      }
    }
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
    & .button--blue {
      background: linear-gradient(45deg, #1da1f2, #0e71c8);
      box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.4);
      :hover {
        box-shadow: 0px 7px 30px rgba(19, 127, 212, 0.75);
      }
    }
    & .button--orange {
      background: linear-gradient(45deg, #d5135a, #f05924);
      box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.35);
      :hover {
        box-shadow: 0px 7px 30px rgba(223, 45, 70, 0.75);
      }
    }
    & .button--gray {
      box-shadow: none;
      background: #dcdcdc;
      color: #142029;
    }
  } ;
`;
