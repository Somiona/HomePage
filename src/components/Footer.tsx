import React, { FC, ReactNode } from "react";
import Container from "react-bootstrap/Container";

interface IFooterProps {
    children?: ReactNode;
}

const Footer: FC<IFooterProps> = ({ children }) => (
    <footer className={"footer mt-auto py-3"}>
        <Container className={"text-center"}>{children}</Container>
    </footer>
);

export default Footer;
