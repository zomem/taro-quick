import React from 'react'
import { styled } from '@linaria/react'

interface PageProps {
  bgColor?: string
}

const Page = styled.div<PageProps>`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0)'};
`

export default Page