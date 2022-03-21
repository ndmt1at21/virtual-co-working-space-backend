export type SendTarget = {
	email: string;
	context: any;
};

export type MailOptions = {
	from: string;
	to: string;
	subject: string;
	templateUrl: string;
	context: any;
};
