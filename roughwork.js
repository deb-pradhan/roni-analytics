<header className={styles.header}>
                
                    
                    <Image  src="/navbar-logo.svg" className={styles.logo}  alt="Picture of the author" width={250} height={250}></Image>
                    
                    <nav>
                        <ul className={styles.navlinks}>
                            <li>
                                <Link href="/">
                                    <a>About</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/posts/first-post">
                                    <a>Products</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/posts/first-post">
                                    <a>Consulting</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/posts/first-post">
                                    <a>Career</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <Link href="#">
                        <a className={styles.button}> Contact </a>
                    </Link>
                
                
            </header>
