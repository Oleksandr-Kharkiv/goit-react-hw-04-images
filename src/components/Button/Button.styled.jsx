import styled from '@emotion/styled';

export const ButtonComponent = styled.button`
  margin: 30px auto 0;
  display: block;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #247035;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover,
  &:focus {
    background-color: #075f1a;
  }
  &:active {
    color: orange;
  }
`;
