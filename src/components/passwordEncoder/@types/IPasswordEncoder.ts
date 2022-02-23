export interface IPasswordEncoder {
	encode(password: string): string;
}
