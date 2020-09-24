import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  background: #2a7ae4;
  font: 25px Satisfy, sans-serif;

  text-align: center;
  padding: 8px;

    h1 {
    text-decoration: none;
    color: ${shade(0.1, 'white')};

    &:hover {
      color: white;
    }
  }

  div {
    /* width: 50%; */
    flex-grow: 1;
    color: white;
    font: 20px Roboto, sans-serif;

    position: absolute;
    top: 30px;
    right: 30px;
  }
`;

export const Form = styled.form`
  max-width: 500px;
  border-radius: 10px;
  text-align: center;

  position: absolute;
    top: 18px;
    left: 30px;

  input {
    /* margin-top: 30px; */
    border: 0;
    border-radius: 5px 0 0 5px;
    height: 50px;
    width: 300px;
    padding: 0 10px;
    color: #3a3a3a;
    font-size: 20px;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 150px;
    height: 50px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 200ms;
    font-size: 20px;

    &:hover {
      background: ${shade(0.2, '#16D377')};
    }
  }
`;

export const MainContainer = styled.div`
  padding: 30px;
  min-height: 300px;
  display: flex;

  .divTarefas {
    flex: 1;
    display: flex;
  }
`;

export const List = styled.div`
  background-color: #f4f5f7;
  width: 280px;
  padding: 10px;
  margin-right: 10px;
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);

  h1 {
    margin-bottom: 10px;
    color: #3a3a3a;
  }
  }

  button {
    display: block;
    text-decoration: none;
    width: 200px;
    padding: 10px 0;
    margin: 0 auto;
    background: #04d361;
    border-radius: 5px 5px 5px 5px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 200ms;
    font-size: 20px;

    &:hover {
      background: ${shade(0.2, '#16D377')};
    }
  }
`;

export const Card = styled.div`
  background-color: #fff;
  color: #3a3a3a;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  max-width: 250px;
  cursor: pointer;
`;

// lista de pessoas Online
export const OnlineList = styled.div`
  background-color: #f4f5f7;
  max-width: 280px;
  padding: 10px;
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);

  h1 {
    margin-bottom: 10px;
    color: #3a3a3a;
  }

  ul {
    list-style: none;

    li {
      color: #3a3a3a;
      margin-bottom: 5px;
    }
  }
`;

export const FormModal = styled.form`
  /* background-color: ${shade(0.1, 'white')};
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8); */

  color: #4a535a;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  /* margin-top: 50px; */
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 50px;
  text-align: center;

  input {
    /* margin-top: 30px; */
    border: 0;
    border-radius: 5px 0 0 5px;
    height: 50px;
    width: 400px;
    padding: 0 10px;
    color: #3a3a3a;
    font-size: 20px;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 150px;
    height: 50px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 200ms;
    font-size: 20px;

    &:hover {
      background: ${shade(0.2, '#16D377')};
    }
  }
`;

