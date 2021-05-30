import styled, { css } from 'styled-components';

export const HeaderContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.headerHeight || '80px'};
  width: 100%;
  background-color: #fff;
  
  z-index: 99;
  & nav{
    display: flex;
    padding: 2% 6%;
    justify-content:space-between;
    align-items: center;
    height:80px;
    box-shadow: 3px 6px 10px 5px rgba(0, 0, 0, 0.1);

    & .header__brand img{
      margin: auto;
      height:80px;
      width: 150px;
      cursor: pointer;
    }

    & .header__search{
      position: relative;
      display: flex;
      flex-direction: column;

      & .header__search__search-bar{

        & .header__search__input-search{
          width: 1000px;
          margin-left: 15px;
          border-radius: 50px;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }


    & .header__nav-links-menu{
      & ul{
        margin: auto;
        justify-content: center;
  
        & li{
          list-style-type: none;
          display: inline-block;
          padding: 8px 12px;
          position: relative;
  
          & a{
            color: black;
            text-decoration: none;
            font-weight: bold;
            font-size: 18px;
          }
          
          & a:hover{
            color: #ad6800;
          }
        } 
      }  
    }
    

    & .header__nav-links-menu ul li::after{
      content:'';
      width:0%;
      height:2px;
      background: #874d00;
      display: block;
      margin: auto;
      transition: all 0.5s;
    }

    & .header__nav-links-menu ul li:hover::after{
      width: 100%;
    }

    & .header__nav-links-user ul{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;

      & li{
        list-style-type: none;
        display: inline-block;
        padding: 8px 12px;
        position: relative;

        & .nav-links-user__search-icon, .nav-links-user__heart-icon, .nav-links-user__cart-icon, .nav-links-user__user-icon{
          cursor: pointer;
          font-size: 30px;
        }

        & .ant-badge p{
          font-size: 14px;
        }

        & .nav-links-user__user{
          display: inline-block;
        }

        & .hamburger-container__hamburger-icon{
          display: none;
        }
      } 

      & li div {
        display: flex;

        & p{
          margin: auto;
          font-size: 18px;
          font-weight: bold;
        }

        & p:hover{
          color: #874d00;
        }
      }
    } 

    & .header__nav-links-menu-responsive{
      display: none;
    }
    
  }

  @media (max-width: 1024px){
    nav{
      & .header__brand img{
      width: 100px;
    }

      & .header__nav-links-menu {
        display: none;
      }

      & .header__search__search-bar{
        width: 100%!important;
        margin-left: 0px!important;

        & .header__search__input-search{
          width: 100%!important;
        margin-left: 0px!important;
        }
      }


      & .header__nav-links-user ul {

        & li{
          padding: 8px;
  
          & .hamburger-container__hamburger-icon{
            display: block;
            font-size: 20px;
            cursor: pointer;
          }
        }

        & .nav-links-user__wishlist, .nav-links-user__carts {
            display: none;
          }
      }
    }
}
`;

export const UlDrawer = styled.ul`
  display: flex;
  justify-content:flex-end;
  align-items: center;

  & li{
    padding: 8px;
    margin: auto;

    & .nav-links-user__heart-icon, .nav-links-user__cart-icon{
      font-size:30px;
      cursor: pointer;
    }
  }

`;