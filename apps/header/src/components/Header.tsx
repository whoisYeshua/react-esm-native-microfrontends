// import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
// import { Avatar } from '@chakra-ui/avatar'
// import { Heading, Flex } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList, Avatar, Heading, Flex } from '@chakra-ui/react'

export const Header = () => (
  <Flex align="center" justify="space-between">
    <Heading as="h1" size="lg">
      React ESM Native Microfrontend
    </Heading>

    <Menu>
      <MenuButton>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  </Flex>
)
