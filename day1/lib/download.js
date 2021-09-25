import {promisify} from 'util';
import git_repo from 'download-git-repo';
import ora from 'ora';

const clone =(async (repo,desc)=>{
	const dw=promisify(git_repo);
	// 进度显示
	const process=ora('download...$(repo)');
	process.start();
	await dw(repo,desc);
	process.succeed();
});

export default clone;