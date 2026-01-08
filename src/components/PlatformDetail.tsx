import type { Platform } from '../entities/Platform';

type Props = {
  platform?: Platform[];
};
const PlatformDetail = ({ platform }: Props) => {
  console.log('platform ', platform);
  return (
    <div className="flex mt-4 gap-2">
      {platform?.map((p) => (
        <div className='bg-zinc-400 rounded-full p-3'>
          <img className="w-[90%]" src={p.platformIcon} alt="" />
        </div>
      ))}
    </div>
  );
};

export default PlatformDetail;
