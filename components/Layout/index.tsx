import Head from 'next/head'

const Layout = ({ children, auth }: any) => {
    return (
        <>
            <Head>
                <title>Adventuresy</title>
            </Head>
            <div>
                <main>
                    {children}
                </main>
            </div>
        </>
    )

}

export default Layout;