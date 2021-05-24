import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  margin-top:20px;
  width: 300px;
  height: calc(100vh - 330px);
    
  & .account-avatar{
    display:flex;
    justify-content:center;
    align-items: center;
  }
`;