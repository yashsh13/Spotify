import * as React from "react";
import { Html, Head, Body, Tailwind, Text, Section, Img, Row, Column, Link, Font } from "react-email";

interface VerificationEmailProps {
    username: string,
    otp: string
}

export default function VerificationEmail({username ,otp}: VerificationEmailProps) {
    return(
        <Html>
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                    />
            </Head>
            <Tailwind>
                <Body>
                    <Section className="px-[32px] py-[40px] bg-gray-500">
                        <Row>
                        <Column className="w-[80%]">
                            <Img
                            alt="React Email logo"
                            width="42"
                            height="42"
                            src="https://react.email/static/logo-without-background.png"
                            />
                        </Column>
                        <Column align="right">
                            <Row align="right">
                            <Column>
                                <Link href="#">
                                <Img
                                    alt="X"
                                    className="mx-[4px]"
                                    height="36"
                                    src="https://react.email/static/x-logo.png"
                                    width="36"
                                />
                                </Link>
                            </Column>
                            <Column>
                                <Link href="#">
                                <Img
                                    alt="Instagram"
                                    className="mx-[4px]"
                                    height="36"
                                    src="https://react.email/static/instagram-logo.png"
                                    width="36"
                                />
                                </Link>
                            </Column>
                            <Column>
                                <Link href="#">
                                <Img
                                    alt="Facebook"
                                    className="mx-[4px]"
                                    height="36"
                                    src="https://react.email/static/facebook-logo.png"
                                    width="36"
                                />
                                </Link>
                            </Column>
                            </Row>
                        </Column>
                        </Row>
                    </Section>
                    <Section>
                        <Text className="font-semibold text-[24px] text-green-400 leading-[32px] text-center">
                            Welcome to Spotify {username}
                        </Text>
                        <Text className="text-center">
                            Your OTP is {otp}
                        </Text>
                    </Section>
                    <Section className="text-center bg-yellow-100">
                        <table className="w-full">
                        <tr className="w-full">
                            <td align="center">
                            <Text className="my-[8px] font-semibold text-[16px] text-gray-900 leading-[24px]">
                                Spotify
                            </Text>
                            <Text className="mt-[4px] mb-0 text-[16px] text-gray-500 leading-[24px]">
                                Think different
                            </Text>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                            <Text className="my-[8px] font-semibold text-[16px] text-gray-500 leading-[24px]">
                                123 Main Street Anytown, CA 12345
                            </Text>
                            <Text className="mt-[4px] mb-0 font-semibold text-[16px] text-gray-500 leading-[24px]">
                                mail@example.com +123456789
                            </Text>
                            </td>
                        </tr>
                        </table>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    )
}
