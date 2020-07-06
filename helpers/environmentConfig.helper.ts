export enum ConfigName {
	USERNAME = 'username',
	PASSWORD = 'password'
}

export const getEnvironmentConfig = (confgiName: ConfigName) => {
	const args = process.env.npm_config_argv;
	const param = JSON.parse(args).original.find(a => a.includes(`--${confgiName}=`));
	return param && param.split('=')[1].replace(/['"]/g, '').trim();
};
