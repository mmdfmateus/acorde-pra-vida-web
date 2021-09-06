import { Layout, Menu, Input, Button, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainLayout.css";
import logo from './logo.png';
import { useUserContext } from "../../context/UserContext";

const { Header, Content, Footer } = Layout;

export const MainLayout = (props) => {

  const { user, setUser, isUserLogged, setIsUserLogged } = useUserContext()

  useEffect (function(){
    let userValues = localStorage.getItem('user');

    if(userValues){
      setIsUserLogged(true)
      setUser(JSON.parse(userValues))
    }
    
  },[]) 

  return (
    <>
      <Layout className="layout" style={{ minHeight: "100%" }}>
        <Header>
          <div >
            <img className="logo" src={logo} />
          </div>
          <Row>
            <Col offset={8} span={11}>
              <Menu className="navegacao" theme="dark" mode="horizontal">
                <Menu.Item key="home">
                  <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="artistas">
                  <Link to="/artists">Artistas</Link>
                </Menu.Item>
                <Menu.Item key="musicas">
                  <Link to="/songs">Músicas</Link>
                </Menu.Item>
                <Menu.Item key="ranking">
                  <Link to="/ranking">Ranking</Link>
                </Menu.Item>
              </Menu>
            </Col>
            { isUserLogged &&
            <Col className="botoes">
              <Button type="link"><a href="/signup">Olá, {user.name}</a></Button>
              <Button onClick={localStorage.removeItem('user')} ghost><a href="/home">Sair</a></Button>            
            </Col> }
            { !isUserLogged &&
            <Col className="botoes">
              <Button ghost><a href="/login">Logar</a></Button>
              <Button type="link"><a href="/signup">Cadastrar</a></Button>
            </Col> }
          </Row>
        </Header>
        <Content>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Acorde pra vida | ©2021
        </Footer>
      </Layout>
    </>
  );
};
