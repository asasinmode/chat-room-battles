CREATE TABLE `room` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`startedAt` integer,
	`finishedAt` integer,
	`createdAt` integer DEFAULT NOW() NOT NULL
);
