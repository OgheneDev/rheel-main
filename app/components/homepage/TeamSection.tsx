'use client'
import TeamList from "./team/TeamList"

const TeamSection = () => {
  return (
    <section className="md:px-[130px] py-8 px-5 md:py-15">
        <article className="text-center mb-10 ">
            <span className="uppercase text-[#0A2F1E] text-[13px]">Our Team</span>
            <h2 className="text-3xl font-bold text-[#161E2D]">Meet The Team</h2>
        </article>
        <TeamList />
    </section>
  )
}

export default TeamSection