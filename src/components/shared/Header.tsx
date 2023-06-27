'use client'
import NextLink from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdMenu } from "react-icons/md";
import { IconButton } from "components/shared/IconButton";
import { config } from 'settings/siteSettings'

import styles from "styles/components/shared/Header.module.scss";


export const Header = () => {
    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <NextLink href="/" className={styles.logoLink}>
                    <h1 className={styles.siteTitle}>{config.siteTitle}</h1>
                </NextLink>
                <nav className={styles.navigations}>
                    <NavLinks />
                    <CollapsedNavLinks />
                </nav>
            </header>
        </div>
    );
};

const NavLinks = () => {
    return (
        <>
            <NextLink href="/about" className={styles.navigationLink}>
                About
            </NextLink>
            <a
                href={config.repository}
                target="_blank"
                rel="noreferrer"
                className={styles.navigationLink}>
                GitHub
            </a>
        </>
    );
};

const CollapsedNavLinks = () => {
    return (
        <DropdownMenu.Root>
            <div className={styles.collapsedNavigationTrigger}>
                <DropdownMenu.Trigger asChild>
                    <IconButton
                        aria-label="ナビゲーションリンクを開閉する"
                        variant="outlined"
                        icon={<MdMenu />}
                    />
                </DropdownMenu.Trigger>
            </div>
            <DropdownMenu.Portal>
                <DropdownMenu.Content align="end" className={styles.collapsedNavigationContent}>
                    <DropdownMenu.Item asChild>
                        <a href="/about" className={styles.collapsedNavigationLink}>
                            About
                        </a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                        <a
                            href={config.repository}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.collapsedNavigationLink}>
                            GitHub
                        </a>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};