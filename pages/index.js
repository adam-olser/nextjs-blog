import Head from "next/head";
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
    revalidate: 60,
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Adam's developer blog: Next.js tutorials, static generation, and modern React patterns."
        />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I’m <b>Adam</b> — a QA engineer and frontend developer sharing
          practical insights on Next.js, testing, and developer workflow.
        </p>
        <p>
          Updated March 2026: sample blog updated with polished content and a
          production-ready style guide.
        </p>
      </section>
      <section className={utilStyles.headingMd}>
        <p>
          Browse the posts below. If there are no posts yet, new content will
          appear soon.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        {allPostsData.length === 0 ? (
          <p>No posts yet — check back soon for updates.</p>
        ) : (
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
