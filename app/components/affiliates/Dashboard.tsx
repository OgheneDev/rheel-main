import Stores from "../general/Stores"

const Dashboard = () => {
  return (
    <div>
        <div className='px-5 md:px-[160px] py-8 md:py-16'>
        <h2 className='text-xl text-center font-bold mb-6'>Welcome to the Rheel Estate Affiliate Dashboard</h2>
        <div className="">
            <p>Unlock your earning potential with the Rheel Estate Affiliate Program! This is your personal dashboard, where you can track your referrals, monitor your earnings, and manage your progress in real-time</p>
            <p>Whether you’re a seasoned networker or just getting started, this platform gives you full visibility into your success. Here, you can:</p>
            <p>View your referral stats – Track how many clients you’ve referred and their status.</p>
            <p>Monitor your earnings – See how much commission you’ve earned and when payments are due</p>
            <p>Access your referral link/code – Easily share your unique code to start earning.</p>
            <p>Get marketing materials – Download ready-to-use flyers, images, and social media templates.</p>
            <p>Every referral brings you closer to extra income, whether to pay rent, buy a car, or support your family. The more you refer, the more you earn!</p>
            <p>Start sharing today and watch your earnings grow!</p>
        </div>
    </div>
    <div className="md:px-[10px]">
    <Stores />
    </div>
    </div>
  )
}

export default Dashboard