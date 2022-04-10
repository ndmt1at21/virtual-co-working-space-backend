/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 650:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActiveTokenErrorMessages = void 0;
exports.ActiveTokenErrorMessages = {
    INVALID_TOKEN: 'Token is not valid or has expired. Please request a new one'
};


/***/ }),

/***/ 495:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActiveUserToken = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
const user_entity_1 = __webpack_require__(4614);
let ActiveUserToken = class ActiveUserToken extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActiveUserToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ActiveUserToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ActiveUserToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], ActiveUserToken.prototype, "user", void 0);
ActiveUserToken = __decorate([
    (0, typeorm_1.Entity)({ name: 'active_user_token' }),
    (0, typeorm_1.Index)(['token'], { unique: true })
], ActiveUserToken);
exports.ActiveUserToken = ActiveUserToken;


/***/ }),

/***/ 389:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createActiveUserTokenService = void 0;
const typeorm_1 = __webpack_require__(5250);
const activeUserToken_repository_1 = __webpack_require__(6476);
const activeUserToken_service_1 = __webpack_require__(8762);
const createActiveUserTokenService = () => {
    const activeUserTokenRepository = (0, typeorm_1.getCustomRepository)(activeUserToken_repository_1.ActiveUserTokenRepository);
    return (0, activeUserToken_service_1.ActiveUserTokenService)(activeUserTokenRepository);
};
exports.createActiveUserTokenService = createActiveUserTokenService;


/***/ }),

/***/ 6476:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActiveUserTokenRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseRepository_1 = __webpack_require__(7325);
const activeUserToken_entity_1 = __webpack_require__(495);
let ActiveUserTokenRepository = class ActiveUserTokenRepository extends BaseRepository_1.BaseRepository {
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    token
                }
            });
        });
    }
    deleteByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder()
                .delete()
                .where('token = :token', { token })
                .execute();
            return result.affected || 0;
        });
    }
    findByUserIdAndToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    userId,
                    token
                }
            });
        });
    }
};
ActiveUserTokenRepository = __decorate([
    (0, typeorm_1.EntityRepository)(activeUserToken_entity_1.ActiveUserToken)
], ActiveUserTokenRepository);
exports.ActiveUserTokenRepository = ActiveUserTokenRepository;


/***/ }),

/***/ 8762:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActiveUserTokenService = void 0;
const crypto_1 = __importDefault(__webpack_require__(6113));
const config_1 = __importDefault(__webpack_require__(2275));
const appError_1 = __webpack_require__(2720);
const activeToken_error_1 = __webpack_require__(650);
const ActiveUserTokenService = (activeUserTokenRepository) => {
    const createToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const token = crypto_1.default
            .randomBytes(config_1.default.auth.ACTIVE_USER_TOKEN_LENGTH)
            .toString('hex');
        const createdToken = yield activeUserTokenRepository.save({
            userId,
            token
        });
        return Object.assign({}, createdToken);
    });
    const deleteToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        return yield activeUserTokenRepository.deleteByToken(token);
    });
    const validateToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
        const activeUserToken = yield activeUserTokenRepository.findByUserIdAndToken(userId, token);
        if (!activeUserToken) {
            throw new appError_1.IllegalArgumentError(activeToken_error_1.ActiveTokenErrorMessages.INVALID_TOKEN);
        }
        return true;
    });
    return {
        createToken,
        validateToken,
        deleteToken
    };
};
exports.ActiveUserTokenService = ActiveUserTokenService;


/***/ }),

/***/ 4925:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.socketServerLoader = exports.httpServerLoader = exports.mainAppLoaders = void 0;
const socket_io_1 = __webpack_require__(3952);
const globalHandlerError_1 = __webpack_require__(7886);
const database_1 = __webpack_require__(8483);
const main_1 = __webpack_require__(4188);
const queue_1 = __webpack_require__(5141);
const socket_1 = __webpack_require__(8309);
const mainAppLoaders = (app, logger) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectDatabase)();
    logger.info('Database connection has been established successfully.');
    yield (0, database_1.initDatabase)();
    logger.info('Database has been initialized successfully.');
    yield (0, queue_1.createMessageQueues)();
    logger.info('Message queues have been created successfully.');
    yield (0, main_1.loadServices)();
    logger.info('Services have been loaded successfully.');
    (0, main_1.loadBackgroundJobs)();
    logger.info('Background jobs have been loaded successfully.');
    (0, main_1.mainMiddleware)(app, logger);
    logger.info('Middleware has been loaded.');
    (0, main_1.mainRoutes)(app);
    logger.info('Routes have been loaded.');
    app.use(globalHandlerError_1.globalErrorHandler);
    logger.info('Global error handler has been loaded.');
});
exports.mainAppLoaders = mainAppLoaders;
const httpServerLoader = (server, port, logger) => {
    server.listen(port, () => {
        logger.info(`Http server is listening on port ${port}`);
    });
    process.on('uncaughtException', err => {
        logger.error('UNCAUGHT EXCEPTION: ' + err.message);
        server.close(() => {
            process.exit(1);
        });
    });
    return server;
};
exports.httpServerLoader = httpServerLoader;
const socketServerLoader = (server, logger) => {
    const socketServer = new socket_io_1.Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://vispace.tech']
        },
        transports: ['polling', 'websocket'],
        path: '/socket.io'
    });
    logger.info(`Socket server is initialized.`);
    (0, socket_1.socketEventHandlers)(socketServer);
    logger.info(`Socket event handlers has been loaded.`);
    return socketServer;
};
exports.socketServerLoader = socketServerLoader;


/***/ }),

/***/ 366:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createCacheConnection = exports.getCacheConnection = void 0;
const redis_1 = __webpack_require__(7558);
const conn = {};
const getCacheConnection = (connName) => {
    const connection = conn[connName];
    if (!connection)
        throw new Error('Cache connection not found');
    return connection;
};
exports.getCacheConnection = getCacheConnection;
const createCacheConnection = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const promiseConns = options.map((opt) => __awaiter(void 0, void 0, void 0, function* () {
        yield connectToClient(opt.connName, opt.options);
    }));
    yield Promise.all(promiseConns);
});
exports.createCacheConnection = createCacheConnection;
function connectToClient(connName, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, redis_1.createClient)(options);
        yield client.connect();
        conn[connName] = client;
        client.on('error', err => {
            throw err;
        });
        client.on('connect', () => {
            conn[connName] = client;
        });
        return client;
    });
}


/***/ }),

/***/ 8483:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectDatabase = void 0;
const config_1 = __importDefault(__webpack_require__(2275));
const activeUserToken_entity_1 = __webpack_require__(495);
const item_entity_1 = __webpack_require__(1993);
const officeItem_entity_1 = __webpack_require__(2965);
const officeMember_entity_1 = __webpack_require__(5970);
const officeMemberTransform_entity_1 = __webpack_require__(1230);
const officeRole_entity_1 = __webpack_require__(1500);
const office_entity_1 = __webpack_require__(4843);
const passwordResetToken_entity_1 = __webpack_require__(3134);
const refreshToken_entity_1 = __webpack_require__(3669);
const user_entity_1 = __webpack_require__(4614);
const typeorm_1 = __webpack_require__(5250);
const cache_1 = __webpack_require__(366);
const officeMemberRole_entity_1 = __webpack_require__(478);
const officeInvitation_entity_1 = __webpack_require__(9916);
const ormPostgresOptions = {
    type: 'postgres',
    host: config_1.default.db.pg.DB_HOST,
    port: config_1.default.db.pg.DB_PORT,
    username: config_1.default.db.pg.DB_USERNAME,
    password: config_1.default.db.pg.DB_PASSWORD,
    database: config_1.default.db.pg.DB_NAME,
    dropSchema: false,
    synchronize: true,
    entities: [
        user_entity_1.User,
        refreshToken_entity_1.RefreshToken,
        activeUserToken_entity_1.ActiveUserToken,
        passwordResetToken_entity_1.PasswordResetToken,
        item_entity_1.Item,
        office_entity_1.Office,
        officeItem_entity_1.OfficeItem,
        officeMember_entity_1.OfficeMember,
        officeRole_entity_1.OfficeRole,
        officeMemberTransform_entity_1.OfficeMemberTransform,
        officeMemberRole_entity_1.OfficeMemberRole,
        officeInvitation_entity_1.OfficeInvitation
    ]
};
const ormMongoOptions = {
    type: 'mongodb',
    host: config_1.default.db.mongo.DB_HOST,
    port: config_1.default.db.mongo.DB_PORT,
    username: config_1.default.db.mongo.DB_USERNAME,
    password: config_1.default.db.mongo.DB_PASSWORD,
    database: config_1.default.db.mongo.DB_NAME,
    logging: false,
    dropSchema: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: []
};
const officeMemberTransformCache = {
    connName: 'officeMemberTransform',
    options: {
        socket: {
            port: 6379,
            host: 'localhost'
        }
    }
};
const mailCache = {
    connName: 'mail',
    options: {
        socket: {
            port: 6380,
            host: 'localhost'
        }
    }
};
const officeMemberCache = {
    connName: 'officeMember',
    options: {
        socket: {
            port: 6381,
            host: 'localhost'
        }
    }
};
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, typeorm_1.createConnection)(ormPostgresOptions);
            yield (0, cache_1.createCacheConnection)([
                officeMemberTransformCache,
                mailCache,
                officeMemberCache
            ]);
            resolve();
        }
        catch (err) {
            reject('Unable to connect to database: ' + err.message);
        }
    }));
});
exports.connectDatabase = connectDatabase;
__exportStar(__webpack_require__(5370), exports);


/***/ }),

/***/ 5370:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initDatabase = void 0;
const officeRole_repository_1 = __webpack_require__(3913);
const typeorm_1 = __webpack_require__(5250);
const initDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const officeRole = (0, typeorm_1.getCustomRepository)(officeRole_repository_1.OfficeRoleRepository);
        yield officeRole.save([
            { name: 'OWNER' },
            { name: 'ADMIN' },
            { name: 'MEMBER' }
        ]);
    }
    catch (err) { }
});
exports.initDatabase = initDatabase;


/***/ }),

/***/ 4188:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadServices = exports.loadBackgroundJobs = exports.mainRoutes = exports.mainMiddleware = void 0;
const main_middleware_1 = __webpack_require__(2494);
Object.defineProperty(exports, "mainMiddleware", ({ enumerable: true, get: function () { return main_middleware_1.mainMiddleware; } }));
const main_routes_1 = __webpack_require__(2435);
Object.defineProperty(exports, "mainRoutes", ({ enumerable: true, get: function () { return main_routes_1.mainRoutes; } }));
const main_job_1 = __webpack_require__(5074);
Object.defineProperty(exports, "loadBackgroundJobs", ({ enumerable: true, get: function () { return main_job_1.loadBackgroundJobs; } }));
const main_service_1 = __webpack_require__(1567);
Object.defineProperty(exports, "loadServices", ({ enumerable: true, get: function () { return main_service_1.loadServices; } }));


/***/ }),

/***/ 5074:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadBackgroundJobs = void 0;
const auth_job_1 = __webpack_require__(3574);
const officeInvitation_job_1 = __webpack_require__(1868);
const loadBackgroundJobs = () => {
    (0, auth_job_1.loadAuthBackgroundJobs)();
    (0, officeInvitation_job_1.loadInvitationBackgroundJobs)();
};
exports.loadBackgroundJobs = loadBackgroundJobs;


/***/ }),

/***/ 2494:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mainMiddleware = void 0;
const cors_1 = __importDefault(__webpack_require__(3582));
const helmet_1 = __importDefault(__webpack_require__(7806));
const morgan_1 = __importDefault(__webpack_require__(9470));
const express_1 = __importDefault(__webpack_require__(6860));
const app_1 = __webpack_require__(206);
const rateLimit_1 = __webpack_require__(4420);
const mainMiddleware = (app, logger) => {
    const isProduction = app_1.appConfig.NODE_ENV === 'production';
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static('public'));
    app.use((0, rateLimit_1.rateLimiting)({ maxPerIp: 20, timeMs: 1000 }));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: isProduction,
        crossOriginEmbedderPolicy: isProduction
    }));
    app.use((0, cors_1.default)({
        origin: ['http://localhost:3000', 'https://vispace.tech'],
        credentials: true,
        exposedHeaders: [
            'x-total-count',
            'x-refresh-token',
            'x-access-token'
        ]
    }));
    app.use((0, morgan_1.default)(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms', { stream: { write: msg => logger.info(msg) } }));
};
exports.mainMiddleware = mainMiddleware;


/***/ }),

/***/ 2435:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mainRoutes = void 0;
const auth_1 = __webpack_require__(4860);
const users_1 = __webpack_require__(6146);
const items_1 = __webpack_require__(2067);
const offices_1 = __webpack_require__(1747);
const officeItems_1 = __webpack_require__(9817);
const officeMembers_1 = __webpack_require__(7114);
const cloudUpload_api_1 = __webpack_require__(6571);
const officeInvitation_api_1 = __webpack_require__(5284);
const mainRoutes = (app) => {
    const API_PREFIX = '/api/v1';
    const authRouter = (0, auth_1.AuthRouter)();
    const userRouter = (0, users_1.UserRouter)();
    const itemRouter = (0, items_1.ItemRouter)();
    const officeRouter = (0, offices_1.OfficeRouter)();
    const officeItemRouter = (0, officeItems_1.OfficeItemRouter)();
    const officeMemberRouter = (0, officeMembers_1.OfficeMemberRouter)();
    const cloudUploadRouter = (0, cloudUpload_api_1.CloudUploadRouter)();
    const officeInvitationRouter = (0, officeInvitation_api_1.OfficeInvitationRouter)();
    app.use(`${API_PREFIX}/auth`, authRouter);
    app.use(`${API_PREFIX}/users`, userRouter);
    app.use(`${API_PREFIX}/items`, itemRouter);
    app.use(`${API_PREFIX}/offices`, officeRouter);
    app.use(`${API_PREFIX}/office-items`, officeItemRouter);
    app.use(`${API_PREFIX}/office-members`, officeMemberRouter);
    app.use(`${API_PREFIX}/uploads`, cloudUploadRouter);
    app.use(`${API_PREFIX}/invites`, officeInvitationRouter);
};
exports.mainRoutes = mainRoutes;


/***/ }),

/***/ 1567:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadServices = void 0;
const cloudUpload_factory_1 = __webpack_require__(1186);
const mail_factory_1 = __webpack_require__(1876);
const loadServices = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initMailService();
    yield initCloudUploadService();
});
exports.loadServices = loadServices;
function initMailService() {
    return __awaiter(this, void 0, void 0, function* () {
        const mailService = (0, mail_factory_1.createMailService)();
        yield mailService.initialize();
    });
}
function initCloudUploadService() {
    return __awaiter(this, void 0, void 0, function* () {
        const cloudUploadService = (0, cloudUpload_factory_1.createCloudUploadService)();
        yield cloudUploadService.initialize();
    });
}


/***/ }),

/***/ 5141:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMessageQueues = void 0;
const queue_1 = __webpack_require__(247);
const mailQueue = {
    queueName: 'auth_mail',
    options: {
        redis: {
            host: 'localhost',
            port: 6379
        }
    }
};
const officeInvitationQueue = {
    queueName: 'office_invitation',
    options: {
        redis: {
            host: 'localhost',
            port: 6379
        }
    }
};
const createMessageQueues = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, queue_1.createQueues)([mailQueue, officeInvitationQueue]);
});
exports.createMessageQueues = createMessageQueues;


/***/ }),

/***/ 247:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createQueues = exports.getQueue = void 0;
const bull_1 = __importDefault(__webpack_require__(7068));
const queues = {};
const getQueue = (queueName) => {
    const queue = queues[queueName];
    if (!queue)
        throw new Error('Queue not found');
    return queue;
};
exports.getQueue = getQueue;
const createQueues = (queueConfigs) => __awaiter(void 0, void 0, void 0, function* () {
    queueConfigs.forEach((config) => __awaiter(void 0, void 0, void 0, function* () {
        const { queueName, options } = config;
        const queue = createQueue(queueName, options);
        queues[queueName] = queue;
    }));
});
exports.createQueues = createQueues;
function createQueue(queueName, option) {
    return new bull_1.default(queueName, option);
}


/***/ }),

/***/ 8309:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.socketEventHandlers = exports.socketMiddleware = void 0;
const socket_middleware_1 = __webpack_require__(8801);
Object.defineProperty(exports, "socketMiddleware", ({ enumerable: true, get: function () { return socket_middleware_1.socketMiddleware; } }));
const socket_handler_1 = __webpack_require__(8084);
Object.defineProperty(exports, "socketEventHandlers", ({ enumerable: true, get: function () { return socket_handler_1.socketEventHandlers; } }));


/***/ }),

/***/ 8084:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.socketEventHandlers = void 0;
const authSocket_factory_1 = __webpack_require__(1689);
const office_factory_1 = __webpack_require__(4903);
const socketEventHandlers = (socketServer) => {
    const socketAuthMiddleware = (0, authSocket_factory_1.createSocketMiddleware)();
    socketServer.use(socketAuthMiddleware.protect);
    socketServer.on('connection', socket => {
        (0, office_factory_1.createOfficeSocketHandler)(socketServer, socket);
    });
};
exports.socketEventHandlers = socketEventHandlers;


/***/ }),

/***/ 8801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.socketMiddleware = void 0;
const authSocket_factory_1 = __webpack_require__(1689);
const socketMiddleware = (server, logger) => {
    const authMiddleware = (0, authSocket_factory_1.createSocketMiddleware)();
    server.use(authMiddleware.protect);
};
exports.socketMiddleware = socketMiddleware;


/***/ }),

/***/ 4420:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rateLimiting = void 0;
const appError_1 = __webpack_require__(2720);
const redis_1 = __webpack_require__(7558);
const rateLimit_error_1 = __webpack_require__(6970);
const client = (0, redis_1.createClient)();
client.connect();
client.on('connect', () => console.log('Redis for rate limiting is connected'));
client.on('error', err => console.log('Redis for rate limiting error: ', err));
const rateLimiting = ({ timeMs, maxPerIp, errMessage }) => {
    client.flushAll();
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const ip = req.connection.remoteAddress ||
            req.headers['x-forward-for'] ||
            '127.0.0.1';
        const nRequest = yield incrNumberRequestOfIp(ip);
        if (nRequest === 1)
            yield expireNumberRequestOfIp(ip, timeMs);
        if (nRequest > maxPerIp) {
            return next(new appError_1.TooManyRequestError(errMessage || rateLimit_error_1.RateLimitErrorMessages.RATE_LIMIT_EXCEEDED));
        }
        next();
    });
};
exports.rateLimiting = rateLimiting;
function incrNumberRequestOfIp(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        return client.incr(ip);
    });
}
function expireNumberRequestOfIp(ip, timeMs) {
    return __awaiter(this, void 0, void 0, function* () {
        return client.expire(ip, timeMs / 1000);
    });
}


/***/ }),

/***/ 6970:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RateLimitErrorMessages = void 0;
exports.RateLimitErrorMessages = {
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.'
};


/***/ }),

/***/ 9124:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ForgotPasswordDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
const auth_error_1 = __webpack_require__(1204);
class ForgotPasswordDto {
}
__decorate([
    (0, class_validator_1.IsDefined)({ message: auth_error_1.AuthErrorMessages.LOGIN_MISSING_EMAIL_PASSWORD }),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
exports.ForgotPasswordDto = ForgotPasswordDto;


/***/ }),

/***/ 8134:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class LoginDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;


/***/ }),

/***/ 6833:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class RegisterDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must have minimum eight characters' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~.,_=+@$!%*?&])[A-Za-z\d`~.,_=+@$!%*?&]{8,}$/, {
        message: 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "passwordConfirm", void 0);
exports.RegisterDto = RegisterDto;


/***/ }),

/***/ 3136:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordContentDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class ResetPasswordContentDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~.,_=+@$!%*?&])[A-Za-z\d`~.,_=+@$!%*?&]{8,}$/, {
        message: 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'
    }),
    __metadata("design:type", String)
], ResetPasswordContentDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResetPasswordContentDto.prototype, "confirmPassword", void 0);
exports.ResetPasswordContentDto = ResetPasswordContentDto;


/***/ }),

/***/ 3204:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRouter = void 0;
const express_1 = __webpack_require__(6860);
const auth_strategy_1 = __webpack_require__(7242);
const auth_factory_1 = __webpack_require__(6901);
const AuthRouter = () => {
    const authController = (0, auth_factory_1.createAuthController)();
    const { restrictToGuest, protect } = (0, auth_factory_1.createAuthMiddleware)();
    (0, auth_strategy_1.loadStrategies)();
    const router = (0, express_1.Router)();
    router
        .post('/login', restrictToGuest, authController.localLogin)
        .post('/register', restrictToGuest, authController.localRegister)
        .get('/google', restrictToGuest, authController.googleLogin)
        .get('/facebook', restrictToGuest, authController.facebookLogin)
        .get('/google/callback', restrictToGuest, authController.googleLoginCallback)
        .get('/facebook/callback', restrictToGuest, authController.facebookLoginCallback)
        .post('/forgot', restrictToGuest, authController.forgotPassword)
        .patch('/reset/:token', restrictToGuest, authController.resetPassword)
        .post('/refreshToken', restrictToGuest, authController.refreshAccessToken);
    router
        .get('/activate/:token', protect, authController.activateNewUser)
        .get('/logout', protect, authController.logout);
    return router;
};
exports.AuthRouter = AuthRouter;


/***/ }),

/***/ 7579:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const passport_1 = __importDefault(__webpack_require__(3511));
const config_1 = __importDefault(__webpack_require__(2275));
const query_string_1 = __importDefault(__webpack_require__(9103));
const httpStatusCode_1 = __webpack_require__(7500);
const auth_error_1 = __webpack_require__(1204);
const appError_1 = __webpack_require__(2720);
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const headerConstants_1 = __webpack_require__(6775);
const requestValidation_1 = __webpack_require__(5718);
const Login_dto_1 = __webpack_require__(8134);
const ResetPasswordContent_dto_1 = __webpack_require__(3136);
const ForgotPassword_dto_1 = __webpack_require__(9124);
const Register_dto_1 = __webpack_require__(6833);
const app_1 = __webpack_require__(206);
const AuthController = (authMailQueueProducer, authService, logger) => {
    const localLogin = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, requestValidation_1.validateRequestBody)(Login_dto_1.LoginDto, req.body);
        if (errors.length > 0) {
            logger.error(`User cannot login: ${errors}`);
            throw new appError_1.IllegalArgumentError('Invalid login data', errors);
        }
        const loginDto = req.body;
        const [user, { accessToken, refreshToken }] = yield authService.localLogin(loginDto);
        logger.info(`User with id ${user.id} logged in successfully`);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            user,
            accessToken,
            refreshToken
        });
    }));
    const localRegister = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, requestValidation_1.validateRequestBody)(Register_dto_1.RegisterDto, req.body);
        if (errors.length > 0) {
            logger.error(`User create login: ${errors}`);
            throw new appError_1.IllegalArgumentError('Invalid register data', errors);
        }
        const registerDto = req.body;
        const { user, activeToken } = yield authService.localRegister(registerDto);
        logger.info(`User with email ${user.email} registered successfully has id ${user.id}`);
        const clientUrl = app_1.appConfig.CLIENT_DOMAIN;
        authMailQueueProducer.addRegisterConfirmationJob(user, activeToken, clientUrl);
        res.status(httpStatusCode_1.HttpStatusCode.CREATED).json({
            user,
            message: 'User created successfully'
        });
    }));
    const googleLogin = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate('google', {
            session: false,
            scope: ['email', 'profile']
        })(req, res, next);
        logger.info('Success redirect to google login page');
    }));
    const facebookLogin = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate('facebook', {
            session: false,
            scope: ['email', 'public_profile']
        })(req, res, next);
        logger.info('Success redirect to facebook login page');
    }));
    const googleLoginCallback = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        oauth2LoginCallback('google', req, res, next);
    }));
    const facebookLoginCallback = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        oauth2LoginCallback('facebook', req, res, next);
    }));
    const logout = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const refreshToken = req.headers[headerConstants_1.HeaderConstants.REFRESH_TOKEN];
        if (!refreshToken) {
            logger.error('Cannot logout: missing refresh token');
            throw new appError_1.IllegalArgumentError(auth_error_1.AuthErrorMessages.LOGOUT_MISSING_REFRESH_TOKEN);
        }
        yield authService.logout(refreshToken);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            message: 'User logged out successfully'
        });
    }));
    const refreshAccessToken = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const currentRefreshToken = req.headers[headerConstants_1.HeaderConstants.REFRESH_TOKEN];
        if (!currentRefreshToken) {
            logger.error('Cannot refresh access token: missing refresh token');
            throw new appError_1.IllegalArgumentError(auth_error_1.AuthErrorMessages.REFRESH_ACCESS_TOKEN_MISSING_REFRESH_TOKEN);
        }
        const userId = req.user.id;
        const { accessToken, refreshToken } = yield authService.refreshAccessToken(userId, currentRefreshToken);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            message: 'Access token renew successfully',
            accessToken,
            refreshToken
        });
    }));
    const forgotPassword = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, requestValidation_1.validateRequestBody)(ForgotPassword_dto_1.ForgotPasswordDto, req.body);
        if (errors.length > 0) {
            logger.error(`Cannot reset password: ${errors}`);
            throw new appError_1.IllegalArgumentError('Invalid forgot password request', errors);
        }
        const forgotPasswordDto = req.body;
        const resetToken = yield authService.forgotPassword(forgotPasswordDto);
        logger.info(`Reset password token sent to email ${forgotPasswordDto.email}`);
        const clientUrl = app_1.appConfig.CLIENT_DOMAIN;
        authMailQueueProducer.addResetPasswordMailJob(forgotPasswordDto.email, resetToken.passwordResetToken, clientUrl);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            message: 'Password reset token created successfully'
        });
    }));
    const resetPassword = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const resetToken = req.params.token;
        if (!resetToken) {
            logger.error('Cannot reset password: missing reset token');
            throw new appError_1.IllegalArgumentError(auth_error_1.AuthErrorMessages.RESET_PASSWORD_MISSING_RESET_TOKEN);
        }
        const errors = yield (0, requestValidation_1.validateRequestBody)(ResetPasswordContent_dto_1.ResetPasswordContentDto, req.body);
        if (errors.length > 0) {
            logger.error(`Cannot reset password: ${errors}`);
            throw new appError_1.IllegalArgumentError('Invalid reset password request', errors);
        }
        const resetPasswordContentDto = req.body;
        yield authService.resetPassword(Object.assign({ resetToken }, resetPasswordContentDto));
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            message: 'Password reset successfully'
        });
    }));
    const activateNewUser = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const token = req.params.token;
        yield authService.activeNewUser(userId, token);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            message: 'User activated successfully'
        });
    }));
    function oauth2LoginCallback(provider, req, res, next) {
        passport_1.default.authenticate(provider, { session: false }, (err, user, info, status) => {
            if (err) {
                logger.error(`Authenticating external user with provider ${provider} failed. Message ${err.message}`);
                next(err);
            }
            const profile = user;
            if (!profile) {
                logger.error(`Invalid external user information. Message ${err.message}`);
                throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_INCORRECT_EXTERNAL);
            }
            authService
                .oauth2LoginCallback(profile)
                .then(([user, { accessToken, refreshToken }]) => {
                const redirectUrl = query_string_1.default.stringifyUrl({
                    url: config_1.default.auth.BASE_FRONTEND_URL,
                    query: {
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }
                });
                logger.info(`User with id ${user.id} logged in (oauth2, provider: ${provider}) successfully`);
                res.redirect(redirectUrl);
            })
                .catch(err => {
                const redirectUrl = query_string_1.default.stringifyUrl({
                    url: config_1.default.auth.BASE_FRONTEND_URL,
                    query: {
                        error: err.message.toLowerCase()
                    }
                });
                logger.error(`User with id ${user.id} logged in (oauth2, provider: ${provider}) failed. Message: ${err.message}`);
                res.redirect(redirectUrl);
            });
        })(req, res, next);
    }
    function getClientUrlFromRequest(req) {
        const clientUrl = req.headers['referer'];
        if (!clientUrl) {
            return undefined;
        }
        return clientUrl.slice(0, -1);
    }
    return {
        localLogin,
        localRegister,
        googleLogin,
        facebookLogin,
        googleLoginCallback,
        facebookLoginCallback,
        logout,
        refreshAccessToken,
        forgotPassword,
        resetPassword,
        activateNewUser
    };
};
exports.AuthController = AuthController;


/***/ }),

/***/ 1204:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthErrorMessages = void 0;
exports.AuthErrorMessages = {
    UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD: 'Your email or password were incorrect',
    UNAUTHORIZED_INCORRECT_EXTERNAL: 'Your external login was incorrect',
    UNAUTHORIZED_USER_BLOCKED: 'User is blocked',
    UNAUTHORIZED_USER_NOT_FOUND: 'User not found',
    UNAUTHORIZED_MISSING_TOKEN: 'Access token is required',
    UNAUTHORIZED_INVALID_TOKEN: 'Access token has expired or is not yet valid',
    UNAUTHORIZED_ALREADY_LOGGED_IN: 'You are already logged in',
    UNAUTHORIZED_PERMISSION_DENIED: 'You do not have permission to access this resource',
    UNAUTHORIZED_EMAIL_NOT_VERIFIED: 'Email is not verified',
    LOGIN_MISSING_EMAIL_PASSWORD: 'Email and password are required',
    LOGIN_EXTERNAL_MISSING_EMAIL: 'Email is required',
    LOGIN_EXTERNAL_USER_NOT_FOUND: 'User not found',
    REGISTER_MISSING_EMAIL: 'Email is required for registration',
    REGISTER_MISSING_DISPLAY_NAME: 'Email is required for registration',
    REGISTER_MISSING_PASSWORD_OR_CONFIRM_PASSWORD: 'Password and confirm password are required for registration',
    REGISTER_MISMATCH_CONFIRM_PASSWORD: 'Password and confirm password must match',
    FORGOT_PASSWORD_MISSING_EMAIL: 'Email is required for forgot password',
    RESET_PASSWORD_MISSING_RESET_TOKEN: 'Reset token is required for password reset',
    RESET_PASSWORD_MISSING_PASSWORD_OR_CONFIRM_PASSWORD: 'Password and confirm password are required for password reset',
    RESET_PASSWORD_MISMATCH: 'Password and confirm password must match',
    RESET_PASSWORD_TOKEN_EXPIRED: 'Reset token has expired',
    RESET_PASSWORD_TOKEN_INVALID: 'Reset token is invalid',
    LOGOUT_MISSING_REFRESH_TOKEN: 'Refresh token is required for logout',
    REFRESH_ACCESS_TOKEN_MISSING_REFRESH_TOKEN: 'Refresh token is required for renew access token'
};


/***/ }),

/***/ 6901:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAuthMailQueue = exports.createAuthMailQueueProducer = exports.createAuthMailWorker = exports.createAuthValidate = exports.createAuthMiddleware = exports.createAuthService = exports.createAuthController = void 0;
const authToken_factory_1 = __webpack_require__(3241);
const logger_1 = __webpack_require__(7767);
const user_factory_1 = __webpack_require__(6586);
const auth_controller_1 = __webpack_require__(7579);
const auth_middleware_1 = __webpack_require__(5658);
const auth_service_1 = __webpack_require__(305);
const auth_validate_1 = __webpack_require__(9640);
const passwordResetToken_factory_1 = __webpack_require__(1538);
const activeUserToken_factory_1 = __webpack_require__(389);
const mail_producer_1 = __webpack_require__(5703);
const queue_1 = __webpack_require__(247);
const mail_factory_1 = __webpack_require__(1876);
const mail_worker_1 = __webpack_require__(8888);
function createAuthController() {
    const authService = createAuthService();
    const authMailQueueProducer = createAuthMailQueueProducer();
    const authController = (0, auth_controller_1.AuthController)(authMailQueueProducer, authService, logger_1.authLogger);
    return authController;
}
exports.createAuthController = createAuthController;
function createAuthService() {
    const userService = (0, user_factory_1.createUserService)();
    const passwordResetTokenService = (0, passwordResetToken_factory_1.createPasswordResetTokenService)();
    const authTokenService = (0, authToken_factory_1.createAuthTokenService)();
    const activeUserTokenService = (0, activeUserToken_factory_1.createActiveUserTokenService)();
    const authValidate = createAuthValidate();
    return (0, auth_service_1.AuthService)(userService, authTokenService, passwordResetTokenService, activeUserTokenService, authValidate);
}
exports.createAuthService = createAuthService;
function createAuthMiddleware() {
    const userRepository = (0, user_factory_1.createUserRepository)();
    const authTokenService = (0, authToken_factory_1.createAuthTokenService)();
    const authValidate = createAuthValidate();
    return (0, auth_middleware_1.AuthMiddleware)(userRepository, authTokenService, authValidate);
}
exports.createAuthMiddleware = createAuthMiddleware;
function createAuthValidate() {
    const userRepository = (0, user_factory_1.createUserRepository)();
    return (0, auth_validate_1.AuthValidate)(userRepository);
}
exports.createAuthValidate = createAuthValidate;
function createAuthMailWorker() {
    const queue = createAuthMailQueue();
    const mailService = (0, mail_factory_1.createMailService)();
    const logger = logger_1.authLogger;
    return (0, mail_worker_1.AuthMailWorker)(queue, mailService, logger);
}
exports.createAuthMailWorker = createAuthMailWorker;
function createAuthMailQueueProducer() {
    const queue = createAuthMailQueue();
    return (0, mail_producer_1.AuthMailQueueProducer)(queue);
}
exports.createAuthMailQueueProducer = createAuthMailQueueProducer;
function createAuthMailQueue() {
    return (0, queue_1.getQueue)('auth_mail');
}
exports.createAuthMailQueue = createAuthMailQueue;


/***/ }),

/***/ 3574:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadAuthBackgroundJobs = void 0;
const auth_factory_1 = __webpack_require__(6901);
const loadAuthBackgroundJobs = () => {
    const authMailWorker = (0, auth_factory_1.createAuthMailWorker)();
    authMailWorker.load();
};
exports.loadAuthBackgroundJobs = loadAuthBackgroundJobs;


/***/ }),

/***/ 5658:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMiddleware = void 0;
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const auth_error_1 = __webpack_require__(1204);
const appError_1 = __webpack_require__(2720);
const UserStatus_1 = __webpack_require__(6648);
const AuthMiddleware = (userRepository, authTokenService, authValidate) => {
    const protect = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN);
        }
        const { id, type, email, status } = yield deserializeUser(accessToken);
        req.user = {
            id,
            roles: [type],
            email,
            emailVerified: status === UserStatus_1.UserStatus.INACTIVE
        };
        next();
    }));
    const restrictToGuest = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const accessToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!accessToken ||
            accessToken === 'null' ||
            accessToken === 'undefined') {
            next();
            return;
        }
        try {
            const user = yield deserializeUser(accessToken);
            if (user)
                throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN);
        }
        catch (err) {
            next();
        }
    }));
    const restrictToEmailVerified = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const isEmailVerified = (_c = req.user) === null || _c === void 0 ? void 0 : _c.emailVerified;
        if (!isEmailVerified)
            throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_EMAIL_NOT_VERIFIED);
    }));
    const restrictTo = (roles) => {
        return (req, res, next) => {
            const hasPermission = roles.every(role => { var _a; return (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles.includes(role); });
            if (hasPermission) {
                next();
            }
            if (!hasPermission) {
                next(new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_PERMISSION_DENIED));
            }
        };
    };
    function deserializeUser(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield authTokenService.validateAccessToken(accessToken);
            const userId = yield authTokenService.getUserIdFromAccessToken(accessToken);
            yield authValidate.validateUserCanAccessResourceById(userId);
            const user = yield userRepository.findById(userId);
            if (!user)
                throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_USER_NOT_FOUND);
            return user;
        });
    }
    return { protect, restrictTo, restrictToGuest, restrictToEmailVerified };
};
exports.AuthMiddleware = AuthMiddleware;


/***/ }),

/***/ 305:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const AuthService = (userService, authTokenService, passwordResetTokenService, activeUserTokenService, authValidate) => {
    const localLogin = (loginDto) => __awaiter(void 0, void 0, void 0, function* () {
        yield authValidate.validateLocalUserCanLogin(loginDto);
        const user = yield userService.findUserByEmail(loginDto.email);
        const [accessToken, refreshToken] = yield authTokenService.createAccessTokenAndRefreshToken(user.id);
        return [user, { accessToken, refreshToken }];
    });
    const oauth2LoginCallback = (profile) => __awaiter(void 0, void 0, void 0, function* () {
        yield authValidate.validateExternalUserCanLogin(profile);
        const user = yield oauth2ProfileFindOrCreate(profile);
        const [accessToken, refreshToken] = yield authTokenService.createAccessTokenAndRefreshToken(user.id);
        return [user, { accessToken, refreshToken }];
    });
    const localRegister = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userService.createLocalUser(createUserDto);
        const { token } = yield activeUserTokenService.createToken(user.id);
        return { user, activeToken: token };
    });
    const activeNewUser = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
        yield activeUserTokenService.validateToken(userId, token);
        yield userService.activeNewUser(userId);
        yield activeUserTokenService.deleteToken(token);
    });
    const refreshAccessToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield authTokenService.validateRefreshTokenCanRenewAccessToken(userId, refreshToken);
        yield authTokenService.blockRefreshToken(refreshToken);
        const [accessToken, newRefreshToken] = yield authTokenService.createAccessTokenAndRefreshToken(userId);
        return { accessToken, refreshToken: newRefreshToken };
    });
    const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield authTokenService.deleteRefreshToken(refreshToken);
    });
    const forgotPassword = (forgotPasswordDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = forgotPasswordDto;
        yield authValidate.validateUserForgotPassword(email);
        const user = yield userService.findUserByEmail(email);
        return yield passwordResetTokenService.createToken(user.id);
    });
    const resetPassword = (resetPasswordDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { resetToken, password, confirmPassword } = resetPasswordDto;
        yield passwordResetTokenService.validateToken(resetToken);
        const resetTokenEntity = yield passwordResetTokenService.findByPlainToken(resetToken);
        const user = yield userService.findUserById(resetTokenEntity.userId);
        yield userService.updatePasswordById(user.id, {
            password,
            confirmPassword
        });
        yield passwordResetTokenService.deleteByUserId(user.id);
    });
    function oauth2ProfileFindOrCreate(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const { profileId, email, provider, name, avatar, phone } = profile;
            const user = yield userService.findOrCreateUserByExternal({
                externalId: profileId,
                email,
                provider,
                name,
                avatar,
                phone
            });
            return user;
        });
    }
    return {
        localLogin,
        oauth2LoginCallback,
        localRegister,
        refreshAccessToken,
        logout,
        forgotPassword,
        resetPassword,
        activeNewUser
    };
};
exports.AuthService = AuthService;


/***/ }),

/***/ 7242:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadStrategies = void 0;
const passport_1 = __importDefault(__webpack_require__(3511));
const config_1 = __importDefault(__webpack_require__(2275));
const passport_google_oauth2_1 = __webpack_require__(8117);
const passport_facebook_1 = __webpack_require__(3210);
const UserLoginProvider_1 = __webpack_require__(6237);
const auth_error_1 = __webpack_require__(1204);
const GoogleStrategy = () => {
    const strategy = new passport_google_oauth2_1.Strategy({
        callbackURL: '/api/v1/auth/google/callback',
        clientID: config_1.default.auth.GOOGLE_CLIENT_ID,
        clientSecret: config_1.default.auth.GOOGLE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        if (profile.emails.length === 0)
            return done(auth_error_1.AuthErrorMessages.LOGIN_EXTERNAL_USER_NOT_FOUND, null);
        const convertedProfile = {
            email: profile.emails[0],
            avatar: profile.picture,
            profileId: profile.id,
            phone: profile.phone,
            name: profile.displayName,
            provider: UserLoginProvider_1.UserLoginProvider.GOOGLE
        };
        return done(null, convertedProfile);
    });
    passport_1.default.use('google', strategy);
};
const FacebookStrategy = () => {
    const strategy = new passport_facebook_1.Strategy({
        callbackURL: '/api/v1/auth/facebook/callback',
        clientID: config_1.default.auth.FACEBOOK_CLIENT_ID,
        clientSecret: config_1.default.auth.FACEBOOK_CLIENT_SECRET,
        profileFields: ['id', 'email', 'displayName', 'name', 'photos']
    }, (accessToken, refreshToken, profile, done) => {
        if (profile.emails.length === 0)
            return done(auth_error_1.AuthErrorMessages.LOGIN_EXTERNAL_USER_NOT_FOUND, null);
        const convertedProfile = {
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            profileId: profile.id,
            phone: profile.phone,
            name: profile.displayName,
            provider: UserLoginProvider_1.UserLoginProvider.FACEBOOK
        };
        return done(null, convertedProfile);
    });
    passport_1.default.use('facebook', strategy);
};
const loadStrategies = () => {
    GoogleStrategy();
    FacebookStrategy();
};
exports.loadStrategies = loadStrategies;


/***/ }),

/***/ 9640:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthValidate = void 0;
const appError_1 = __webpack_require__(2720);
const bcrypt_1 = __webpack_require__(7096);
const UserLoginProvider_1 = __webpack_require__(6237);
const UserStatus_1 = __webpack_require__(6648);
const auth_error_1 = __webpack_require__(1204);
const user_error_1 = __webpack_require__(2148);
const AuthValidate = (userRepository) => {
    const validateUserCanAccessResourceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.findById(id);
        checkUserExists(user);
        checkUserActive(user);
        return true;
    });
    const validateLocalUserCanLogin = (loginDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = loginDto;
        const user = yield userRepository.findUserByEmail(email);
        checkUserExists(user);
        checkLoginProviderMatch(user, UserLoginProvider_1.UserLoginProvider.LOCAL);
        checkUserActive(user);
        checkPasswordMatch(user, password);
        return true;
    });
    const validateExternalUserCanLogin = (profile) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, provider } = profile;
        const user = yield userRepository.findUserByEmail(email);
        if (user) {
            checkLoginProviderMatch(user, provider);
            checkUserActive(user);
        }
        return true;
    });
    const validateUserForgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.findUserByEmail(email);
        checkUserExists(user);
        checkUserActive(user);
        return true;
    });
    function checkUserExists(user) {
        if (!user) {
            throw new appError_1.UnauthorizedError(user_error_1.UserErrorMessage.USER_NOT_FOUND);
        }
    }
    function checkPasswordMatch(user, password) {
        if (!(0, bcrypt_1.compareSync)(password, user.password)) {
            throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD);
        }
    }
    function checkLoginProviderMatch(user, provider) {
        if (user.provider !== provider) {
            throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD);
        }
    }
    function checkUserActive(user) {
        if (user.status === UserStatus_1.UserStatus.BLOCKED) {
            throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_USER_BLOCKED);
        }
    }
    return {
        validateLocalUserCanLogin,
        validateExternalUserCanLogin,
        validateUserCanAccessResourceById,
        validateUserForgotPassword
    };
};
exports.AuthValidate = AuthValidate;


/***/ }),

/***/ 4860:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3204), exports);


/***/ }),

/***/ 5703:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMailQueueProducer = void 0;
const AuthMailQueueProducer = (queue) => {
    const addRegisterConfirmationJob = (user, activeToken, clientUrl) => {
        queue.add('auth_register_activate', { user, activeToken, clientUrl });
    };
    const addResetPasswordMailJob = (email, resetToken, clientUrl) => {
        queue.add('auth_reset_password', {
            email,
            resetToken,
            clientUrl
        });
    };
    return { addRegisterConfirmationJob, addResetPasswordMailJob };
};
exports.AuthMailQueueProducer = AuthMailQueueProducer;


/***/ }),

/***/ 8888:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMailWorker = void 0;
const path_1 = __importDefault(__webpack_require__(1017));
const AuthMailWorker = (queue, mailService, logger) => {
    const load = () => {
        loadRegisterActivationJob();
        loadResetPasswordJob();
    };
    function loadRegisterActivationJob() {
        queue.process('auth_register_activate', 10, (job) => __awaiter(this, void 0, void 0, function* () {
            const user = job.data.user;
            const activeToken = job.data.activeToken;
            const clientUrl = job.data.clientUrl;
            if (!user || !activeToken)
                throw new Error('User or active token is undefined');
            logger.info(`Start sending activation link to email: ${user.email}`);
            const result = yield mailService.sendMail({
                from: 'ViSpace <noreply@authentication.vispace.tech>',
                to: user.email,
                subject: 'Welcome to our app',
                templateUrl: path_1.default.resolve('src/components/mailTemplates/accountActivate.html'),
                context: {
                    activationUrl: `${clientUrl}/auth/activate/${activeToken}`,
                    receiver: `${user.name}`
                }
            });
            logger.info(`Activation link sent to email: ${user.email} successfully`);
        }));
    }
    function loadResetPasswordJob() {
        queue.process('auth_reset_password', 10, (job) => __awaiter(this, void 0, void 0, function* () {
            const { data } = job;
            const email = data.email;
            const resetToken = data.resetToken;
            const clientUrl = data.clientUrl;
            logger.info(`Start sending reset password link to email: ${email}`);
            const result = yield mailService.sendMail({
                from: 'ViSpace <noreply@authentication.vispace.tech>',
                to: email,
                subject: 'Reset password',
                templateUrl: path_1.default.resolve('src/components/mailTemplates/resetPassword.html'),
                context: {
                    resetPasswordUrl: `${clientUrl}/auth/reset/${resetToken}`
                }
            });
            logger.info(`Reset password link sent to email: ${email} successfully`);
        }));
    }
    return { load };
};
exports.AuthMailWorker = AuthMailWorker;


/***/ }),

/***/ 1689:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSocketMiddleware = void 0;
const auth_factory_1 = __webpack_require__(6901);
const authToken_factory_1 = __webpack_require__(3241);
const user_factory_1 = __webpack_require__(6586);
const authSocket_middleware_1 = __webpack_require__(2578);
function createSocketMiddleware() {
    const userRepository = (0, user_factory_1.createUserRepository)();
    const authTokenService = (0, authToken_factory_1.createAuthTokenService)();
    const authValidate = (0, auth_factory_1.createAuthValidate)();
    return (0, authSocket_middleware_1.AuthSocketMiddleware)(userRepository, authTokenService, authValidate);
}
exports.createSocketMiddleware = createSocketMiddleware;


/***/ }),

/***/ 2578:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthSocketMiddleware = void 0;
const auth_error_1 = __webpack_require__(1204);
const catchAsyncSocketMiddleware_1 = __webpack_require__(5021);
const appError_1 = __webpack_require__(2720);
const AuthSocketMiddleware = (userRepository, authTokenService, authValidate) => {
    const protect = (0, catchAsyncSocketMiddleware_1.catchAsyncSocketMiddleware)((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = socket.handshake.auth.accessToken;
        if (!accessToken) {
            throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_MISSING_TOKEN);
        }
        const { id, type, email } = yield deserializeUser(accessToken);
        socket.user = { id, email, roles: [type] };
        next();
    }));
    const restrictToGuest = (0, catchAsyncSocketMiddleware_1.catchAsyncSocketMiddleware)((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (socket.user) {
            throw new Error(auth_error_1.AuthErrorMessages.UNAUTHORIZED_ALREADY_LOGGED_IN);
        }
        if (!socket.user) {
            next();
        }
    }));
    const restrictTo = (roles) => {
        return (0, catchAsyncSocketMiddleware_1.catchAsyncSocketMiddleware)((req, next) => __awaiter(void 0, void 0, void 0, function* () {
            const hasPermission = roles.every(role => { var _a; return (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles.includes(role); });
            if (hasPermission) {
                next();
            }
            if (!hasPermission) {
                throw new Error(auth_error_1.AuthErrorMessages.UNAUTHORIZED_PERMISSION_DENIED);
            }
        }));
    };
    function deserializeUser(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield authTokenService.validateAccessToken(accessToken);
            const userId = yield authTokenService.getUserIdFromAccessToken(accessToken);
            yield authValidate.validateUserCanAccessResourceById(userId);
            const user = yield userRepository.findById(userId);
            if (!user)
                throw new appError_1.UnauthorizedError(auth_error_1.AuthErrorMessages.UNAUTHORIZED_USER_NOT_FOUND);
            return user;
        });
    }
    return { protect, restrictTo, restrictToGuest };
};
exports.AuthSocketMiddleware = AuthSocketMiddleware;


/***/ }),

/***/ 8999:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthTokenErrorMessages = void 0;
exports.AuthTokenErrorMessages = {
    INVALID_ACCESS_TOKEN: 'Access token is invalid',
    INVALID_REFRESH_TOKEN: 'Error validating refresh token',
    REFRESH_TOKEN_EXPIRED: 'Refresh token has expired. Please login again',
    ACCESS_TOKEN_EXPIRED: 'Access token has expired'
};


/***/ }),

/***/ 3241:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAuthTokenValidate = exports.createAuthTokenService = void 0;
const typeorm_1 = __webpack_require__(5250);
const refreshToken_repository_1 = __webpack_require__(1663);
const authToken_service_1 = __webpack_require__(8172);
const authToken_validate_1 = __webpack_require__(79);
function createAuthTokenService() {
    const refreshTokenRepository = (0, typeorm_1.getCustomRepository)(refreshToken_repository_1.RefreshTokenRepository);
    const authTokenValidate = createAuthTokenValidate();
    const authTokenService = (0, authToken_service_1.AuthTokenService)(refreshTokenRepository, authTokenValidate);
    return authTokenService;
}
exports.createAuthTokenService = createAuthTokenService;
function createAuthTokenValidate() {
    const authTokenValidate = (0, authToken_validate_1.AuthTokenValidate)();
    return authTokenValidate;
}
exports.createAuthTokenValidate = createAuthTokenValidate;


/***/ }),

/***/ 8172:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthTokenService = void 0;
const jsonwebtoken_1 = __importDefault(__webpack_require__(9344));
const crypto_1 = __importDefault(__webpack_require__(6113));
const config_1 = __importDefault(__webpack_require__(2275));
const util_1 = __importDefault(__webpack_require__(3837));
const appError_1 = __webpack_require__(2720);
const authToken_error_1 = __webpack_require__(8999);
const AuthTokenService = (refreshTokenRepository, authTokenValidate) => {
    const createAccessTokenAndRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return [createAccessToken(userId), yield createRefreshToken(userId)];
    });
    const createAccessToken = (userId) => {
        return jsonwebtoken_1.default.sign({ userId }, config_1.default.auth.JWT_SECRET, {
            issuer: config_1.default.auth.JWT_ISSUER,
            expiresIn: Date.now() + config_1.default.auth.JWT_ACCESS_TOKEN_EXPIRES_TIME,
            algorithm: 'HS256'
        });
    };
    const createRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const token = crypto_1.default
            .randomBytes(config_1.default.auth.REFRESH_TOKEN_LENGTH)
            .toString('hex');
        yield refreshTokenRepository.save({
            token,
            userId,
            expiresAt: new Date(Date.now() + config_1.default.auth.REFRESH_TOKEN_EXPIRES_TIME)
        });
        return token;
    });
    const blockRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield refreshTokenRepository.blockByToken(refreshToken);
    });
    const deleteRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield refreshTokenRepository.deleteByToken(refreshToken);
    });
    const getUserIdFromAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = (yield util_1.default.promisify(jsonwebtoken_1.default.verify)(token, config_1.default.auth.JWT_SECRET));
        return payload.userId;
    });
    const validateAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        let jwtPayload;
        try {
            jwtPayload = (yield util_1.default.promisify(jsonwebtoken_1.default.verify)(token, config_1.default.auth.JWT_SECRET));
        }
        catch (err) {
            throw new appError_1.UnauthorizedError(authToken_error_1.AuthTokenErrorMessages.INVALID_ACCESS_TOKEN);
        }
        if (jwtPayload.iss !== config_1.default.auth.JWT_ISSUER) {
            throw new appError_1.UnauthorizedError(authToken_error_1.AuthTokenErrorMessages.INVALID_ACCESS_TOKEN);
        }
        if (!jwtPayload.exp || jwtPayload.exp < Date.now()) {
            throw new appError_1.UnauthorizedError(authToken_error_1.AuthTokenErrorMessages.ACCESS_TOKEN_EXPIRED);
        }
        return true;
    });
    const validateRefreshToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        const refreshTokenEntity = yield refreshTokenRepository.findByTokenAndUserId(userId, refreshToken);
        authTokenValidate.checkRefreshTokenExists(refreshTokenEntity);
        authTokenValidate.checkRefreshTokenActive(refreshTokenEntity);
        authTokenValidate.checkRefreshTokenNotExpired(refreshTokenEntity);
        return true;
    });
    const validateRefreshTokenCanRenewAccessToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        return yield validateRefreshToken(userId, refreshToken);
    });
    return {
        createAccessTokenAndRefreshToken,
        createAccessToken,
        createRefreshToken,
        blockRefreshToken,
        deleteRefreshToken,
        validateAccessToken,
        validateRefreshToken,
        validateRefreshTokenCanRenewAccessToken,
        getUserIdFromAccessToken
    };
};
exports.AuthTokenService = AuthTokenService;


/***/ }),

/***/ 79:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthTokenValidate = void 0;
const appError_1 = __webpack_require__(2720);
const authToken_error_1 = __webpack_require__(8999);
const RefreshTokenStatus_1 = __webpack_require__(4574);
const AuthTokenValidate = () => {
    function checkRefreshTokenExists(refreshToken) {
        if (!refreshToken) {
            throw new appError_1.UnauthorizedError(authToken_error_1.AuthTokenErrorMessages.INVALID_REFRESH_TOKEN);
        }
    }
    function checkRefreshTokenActive(refreshToken) {
        if (refreshToken.status === RefreshTokenStatus_1.RefreshTokenStatus.BLOCKED) {
            throw new appError_1.UnauthorizedError(authToken_error_1.AuthTokenErrorMessages.INVALID_REFRESH_TOKEN);
        }
    }
    function checkRefreshTokenNotExpired(refreshToken) {
        if (refreshToken.expiresAt.getTime() < Date.now()) {
            throw new appError_1.UnauthorizedError(authToken_error_1.AuthTokenErrorMessages.REFRESH_TOKEN_EXPIRED);
        }
    }
    return {
        checkRefreshTokenExists,
        checkRefreshTokenActive,
        checkRefreshTokenNotExpired
    };
};
exports.AuthTokenValidate = AuthTokenValidate;


/***/ }),

/***/ 777:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntity = void 0;
const typeorm_1 = __webpack_require__(5250);
class BaseEntity {
}
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "deletedAt", void 0);
exports.BaseEntity = BaseEntity;


/***/ }),

/***/ 7325:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
class BaseRepository extends typeorm_1.Repository {
    findById(id) {
        return this.findOne(id);
    }
}
exports.BaseRepository = BaseRepository;


/***/ }),

/***/ 9456:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RepositoryQueryBuilder = void 0;
class RepositoryQueryBuilder {
    constructor(repository, tableAlias) {
        this.query = repository.createQueryBuilder(tableAlias);
        this.tableAlias = tableAlias;
    }
    findById(id) {
        this.query.where(`${this.tableAlias}.id = :id`, { id });
        return this;
    }
    withPageable(pageable) {
        const { page, size } = pageable;
        this.query.limit(size);
        this.query.skip(size * (page - 1));
        return this;
    }
    build() {
        return this.query;
    }
}
exports.RepositoryQueryBuilder = RepositoryQueryBuilder;


/***/ }),

/***/ 6571:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudUploadRouter = void 0;
const express_1 = __webpack_require__(6860);
const cloudUpload_factory_1 = __webpack_require__(1186);
const CloudUploadRouter = () => {
    const router = (0, express_1.Router)();
    const cloudUploadController = (0, cloudUpload_factory_1.createCloudUploadController)();
    const cloudUploadMiddleware = (0, cloudUpload_factory_1.createCloudUploadMiddleware)();
    router.post('/avatar', cloudUploadMiddleware.avatarUpload.single('avatar'), cloudUploadController.uploadAvatar);
    router.post('/image', cloudUploadMiddleware.imageUpload.single('image'), cloudUploadController.uploadImage);
    router.post('/model', cloudUploadMiddleware.modelUpload.single('model'), cloudUploadController.uploadModel);
    return router;
};
exports.CloudUploadRouter = CloudUploadRouter;


/***/ }),

/***/ 4949:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudUploadController = void 0;
const streamifier_1 = __importDefault(__webpack_require__(4708));
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const appError_1 = __webpack_require__(2720);
const httpStatusCode_1 = __webpack_require__(7500);
const CloudUploadController = (cloudService) => {
    const uploadModel = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const uploadFile = req.file;
        if (!uploadFile)
            throw new appError_1.IllegalArgumentError('File upload is empty');
        console.log(uploadFile);
        const url = yield cloudService.uploadLargeFile({
            name: uploadFile.originalname,
            stream: createFileStream(uploadFile.buffer),
            type: uploadFile.mimetype
        });
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            data: { url }
        });
    }));
    const uploadAvatar = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const uploadFile = req.file;
        if (!uploadFile)
            throw new appError_1.IllegalArgumentError('File upload is empty');
        const url = yield cloudService.uploadMedia({
            name: uploadFile.originalname,
            stream: createFileStream(uploadFile.buffer),
            type: uploadFile.mimetype
        });
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            data: { url }
        });
    }));
    const uploadImage = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const uploadFile = req.file;
        if (!uploadFile)
            throw new appError_1.IllegalArgumentError('File upload is empty');
        const url = yield cloudService.uploadMedia({
            name: uploadFile.originalname,
            stream: createFileStream(uploadFile.buffer),
            type: uploadFile.mimetype
        });
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            data: { url }
        });
    }));
    function createFileStream(buffer) {
        return streamifier_1.default.createReadStream(buffer);
    }
    return { uploadModel, uploadAvatar, uploadImage };
};
exports.CloudUploadController = CloudUploadController;


/***/ }),

/***/ 1186:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createCloudUploadService = exports.createCloudUploadMiddleware = exports.createCloudUploadController = void 0;
const logger_1 = __webpack_require__(7767);
const cloudUpload_controller_1 = __webpack_require__(4949);
const cloudUpload_middleware_1 = __webpack_require__(6599);
const cloudUpload_service_1 = __webpack_require__(7973);
function createCloudUploadController() {
    const uploadService = createCloudUploadService();
    return (0, cloudUpload_controller_1.CloudUploadController)(uploadService);
}
exports.createCloudUploadController = createCloudUploadController;
function createCloudUploadMiddleware() {
    return (0, cloudUpload_middleware_1.CloudUploadMiddleware)();
}
exports.createCloudUploadMiddleware = createCloudUploadMiddleware;
function createCloudUploadService() {
    return (0, cloudUpload_service_1.CloudUploadService)(logger_1.cloudLogger);
}
exports.createCloudUploadService = createCloudUploadService;


/***/ }),

/***/ 6599:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudUploadMiddleware = void 0;
const multer_1 = __importDefault(__webpack_require__(1738));
const appError_1 = __webpack_require__(2720);
const CloudUploadMiddleware = () => {
    const avatarUpload = (0, multer_1.default)({
        limits: { files: 1, fileSize: 20 * 1024 * 1024 },
        fileFilter: imageFilter
    });
    const imageUpload = (0, multer_1.default)({
        limits: { files: 1, fileSize: 20 * 1024 * 1024 },
        fileFilter: imageFilter
    });
    const modelUpload = (0, multer_1.default)({
        limits: {
            files: 1
        },
        fileFilter: modelFilter
    });
    function imageFilter(req, file, cb) {
        if (file.mimetype.split('/')[0] === 'image') {
            cb(null, true);
        }
        else {
            cb(new appError_1.IllegalArgumentError('Only image files are allowed'));
        }
    }
    function modelFilter(req, file, cb) {
        var _a;
        if ((_a = file.mimetype.split('/')[1]) === null || _a === void 0 ? void 0 : _a.includes('gltf')) {
            cb(null, true);
        }
        else {
            cb(new appError_1.IllegalArgumentError('Only gltf file type is allowed'));
        }
    }
    return { avatarUpload, imageUpload, modelUpload };
};
exports.CloudUploadMiddleware = CloudUploadMiddleware;


/***/ }),

/***/ 7973:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudUploadService = void 0;
const aws_sdk_1 = __importDefault(__webpack_require__(9336));
const uuid_1 = __webpack_require__(5828);
const config_1 = __importDefault(__webpack_require__(2275));
const appError_1 = __webpack_require__(2720);
const cloudinary_1 = __webpack_require__(3518);
const CloudUploadService = (logger) => {
    const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
        initializeCloudinary();
        yield initializeS3();
    });
    const uploadMedia = (file) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({}, (err, result) => {
                if (result) {
                    resolve(result.url);
                }
                if (err) {
                    reject(new appError_1.AppError(err.http_code, err.message));
                }
            });
            file.stream.pipe(stream);
        });
    });
    const uploadLargeFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
        const s3 = new aws_sdk_1.default.S3();
        const params = {
            Bucket: config_1.default.cloud.MODEL_AWS_BUCKET_NAME,
            Key: (0, uuid_1.v4)(),
            ContentType: file.type,
            Body: file.stream,
            ACL: 'public-read',
            ContentDisposition: `attachment; filename="${file.name}"`
        };
        const result = yield s3.upload(params).promise();
        return result.Location;
    });
    function initializeCloudinary() {
        logger.info('Start config cloudinary');
        cloudinary_1.v2.config({
            cloud_name: config_1.default.cloud.IMAGE_CLOUDINARY_CLOUD_NAME,
            api_key: config_1.default.cloud.IMAGE_CLOUDINARY_API_KEY,
            api_secret: config_1.default.cloud.IMAGE_CLOUDINARY_API_SECRET
        });
    }
    function initializeS3() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Start config AWS S3 service');
            aws_sdk_1.default.config.update({
                apiVersion: '2006-03-01',
                region: config_1.default.cloud.MODEL_AWS_BUCKET_REGION,
                credentials: {
                    accessKeyId: config_1.default.cloud.MODEL_AWS_BUCKET_ACCESS_KEY,
                    secretAccessKey: config_1.default.cloud.MODEL_AWS_BUCKET_SECRET_KEY
                }
            });
            logger.info('Create new bucket contains file of models');
            const s3 = new aws_sdk_1.default.S3();
            yield configBucketCors(s3);
            yield s3.createBucket({
                Bucket: config_1.default.cloud.MODEL_AWS_BUCKET_NAME
            });
        });
    }
    function configBucketCors(s3) {
        return __awaiter(this, void 0, void 0, function* () {
            yield s3
                .putBucketCors({
                Bucket: config_1.default.cloud.MODEL_AWS_BUCKET_NAME,
                CORSConfiguration: {
                    CORSRules: [
                        {
                            AllowedHeaders: ['*'],
                            AllowedMethods: ['PUT', 'POST', 'DELETE'],
                            AllowedOrigins: ['*']
                        },
                        {
                            AllowedMethods: ['GET'],
                            AllowedOrigins: ['*']
                        }
                    ]
                }
            })
                .promise();
        });
    }
    return { initialize, uploadMedia, uploadLargeFile };
};
exports.CloudUploadService = CloudUploadService;


/***/ }),

/***/ 2048:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.globalErrorHandlerDev = void 0;
const appError_1 = __webpack_require__(2720);
const httpStatusCode_1 = __webpack_require__(7500);
const globalErrorHandlerDev = (err, req, res, next) => {
    if (err instanceof appError_1.AppError) {
        res.status(err.statusCode).json({
            message: err.message,
            stack: err.stack,
            error: err
        });
        return;
    }
    res.status(httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        stack: err.stack,
        error: err
    });
};
exports.globalErrorHandlerDev = globalErrorHandlerDev;


/***/ }),

/***/ 8715:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.globalErrorHandlerProd = void 0;
const appError_1 = __webpack_require__(2720);
const httpStatusCode_1 = __webpack_require__(7500);
const logger_1 = __webpack_require__(7767);
const globalErrorHandlerProd = (err, req, res, next) => {
    logger_1.serverLogger.error(err);
    if (err instanceof appError_1.AppError) {
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: err.status,
            code: err.statusCode,
            message: err.message,
            errors: err.errors
        });
        return;
    }
    res.status(httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong'
    });
};
exports.globalErrorHandlerProd = globalErrorHandlerProd;


/***/ }),

/***/ 7886:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.globalErrorHandler = void 0;
const app_1 = __webpack_require__(206);
const globalErrorHandlerDev_1 = __webpack_require__(2048);
const globalErrorHandlerProd_1 = __webpack_require__(8715);
const globalErrorHandler = (err, req, res, next) => {
    if (app_1.appConfig.NODE_ENV === 'production') {
        (0, globalErrorHandlerProd_1.globalErrorHandlerProd)(err, req, res, next);
    }
    if (app_1.appConfig.NODE_ENV === 'development') {
        (0, globalErrorHandlerDev_1.globalErrorHandlerDev)(err, req, res, next);
    }
};
exports.globalErrorHandler = globalErrorHandler;


/***/ }),

/***/ 827:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateItemDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class CreateItemDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "modelPath", void 0);
exports.CreateItemDto = CreateItemDto;


/***/ }),

/***/ 2067:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(1412), exports);


/***/ }),

/***/ 1412:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemRouter = void 0;
const express_1 = __webpack_require__(6860);
const item_factory_1 = __webpack_require__(3371);
const item_controller_1 = __webpack_require__(5337);
const ItemRouter = () => {
    const itemService = (0, item_factory_1.createItemService)();
    const itemController = (0, item_controller_1.ItemController)(itemService);
    const router = (0, express_1.Router)();
    router
        .route('/:id')
        .get(itemController.getById)
        .delete(itemController.deleteById)
        .patch(itemController.updateById);
    router.route('/').get(itemController.getAll).post(itemController.create);
    return router;
};
exports.ItemRouter = ItemRouter;


/***/ }),

/***/ 5337:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemController = void 0;
const httpStatusCode_1 = __webpack_require__(7500);
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const pageParser_1 = __webpack_require__(1624);
const requestValidation_1 = __webpack_require__(5718);
const CreateItem_dto_1 = __webpack_require__(827);
const ItemController = (itemService) => {
    const getAll = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const pageable = (0, pageParser_1.pageParser)(req.query, {
            defaultPage: 1,
            defaultSize: 10
        });
        const items = yield itemService.findAll(pageable);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json(items);
    }));
    const getById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield itemService.findById(+req.params.id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json(item);
    }));
    const create = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const err = yield (0, requestValidation_1.validateRequestBody)(CreateItem_dto_1.CreateItemDto, req.body);
        if (err)
            throw err;
        const createItemDto = req.body;
        const item = yield itemService.create(createItemDto);
        res.status(httpStatusCode_1.HttpStatusCode.CREATED).json(item);
    }));
    const deleteById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
    const updateById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
    return { getAll, getById, create, deleteById, updateById };
};
exports.ItemController = ItemController;


/***/ }),

/***/ 8301:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemCreator = void 0;
const ItemCreator = () => {
    const mapItemToItemDto = (item) => {
        const { id, name, modelPath, createdAt } = item;
        return {
            id,
            name,
            modelPath,
            createdAt
        };
    };
    const mapItemsToItemsDto = (items) => {
        return items.map(item => mapItemToItemDto(item));
    };
    return { mapItemToItemDto, mapItemsToItemsDto };
};
exports.ItemCreator = ItemCreator;


/***/ }),

/***/ 1993:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Item = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
let Item = class Item extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)({}),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, name: 'model_path' }),
    __metadata("design:type", String)
], Item.prototype, "modelPath", void 0);
Item = __decorate([
    (0, typeorm_1.Entity)({ name: 'item' })
], Item);
exports.Item = Item;


/***/ }),

/***/ 5687:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemErrorMessages = void 0;
exports.ItemErrorMessages = {
    ITEM_NOT_FOUND: 'Item not found'
};


/***/ }),

/***/ 3371:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createItemCreator = exports.createItemService = exports.createItemRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const item_creator_1 = __webpack_require__(8301);
const item_repository_1 = __webpack_require__(1074);
const item_service_1 = __webpack_require__(2926);
function createItemRepository() {
    return (0, typeorm_1.getCustomRepository)(item_repository_1.ItemRepository);
}
exports.createItemRepository = createItemRepository;
function createItemService() {
    const itemRepository = createItemRepository();
    const itemCreator = createItemCreator();
    const service = (0, item_service_1.ItemService)(itemRepository, itemCreator);
    return service;
}
exports.createItemService = createItemService;
function createItemCreator() {
    return (0, item_creator_1.ItemCreator)();
}
exports.createItemCreator = createItemCreator;


/***/ }),

/***/ 5767:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapItemToItemDto = void 0;
const mapItemToItemDto = (item) => {
    const { id, modelPath, name, createdAt } = item;
    return { id, modelPath, name, createdAt };
};
exports.mapItemToItemDto = mapItemToItemDto;


/***/ }),

/***/ 1074:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const item_entity_1 = __webpack_require__(1993);
const BaseRepository_1 = __webpack_require__(7325);
let ItemRepository = class ItemRepository extends BaseRepository_1.BaseRepository {
};
ItemRepository = __decorate([
    (0, typeorm_1.EntityRepository)(item_entity_1.Item)
], ItemRepository);
exports.ItemRepository = ItemRepository;


/***/ }),

/***/ 2926:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemService = void 0;
const appError_1 = __webpack_require__(2720);
const item_error_1 = __webpack_require__(5687);
const ItemService = (itemRepository, itemCreator) => {
    const findAll = ({ page, size }) => __awaiter(void 0, void 0, void 0, function* () {
        const items = yield itemRepository
            .createQueryBuilder()
            .take(size)
            .skip((page - 1) * size)
            .getMany();
        return itemCreator.mapItemsToItemsDto(items);
    });
    const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield itemRepository.findOne(id);
        if (!item) {
            throw new appError_1.NotFoundError(item_error_1.ItemErrorMessages.ITEM_NOT_FOUND);
        }
        return itemCreator.mapItemToItemDto(item);
    });
    const create = (dto) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield itemRepository.save(dto);
        return itemCreator.mapItemToItemDto(item);
    });
    const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield itemRepository.softDelete(id);
        if (!result.affected) {
            throw new appError_1.NotFoundError(item_error_1.ItemErrorMessages.ITEM_NOT_FOUND);
        }
    });
    const updateById = (id, item) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedItem = yield itemRepository.save(Object.assign({ id }, item));
        if (!updatedItem) {
            throw new appError_1.NotFoundError(item_error_1.ItemErrorMessages.ITEM_NOT_FOUND);
        }
        return itemCreator.mapItemToItemDto(updatedItem);
    });
    return { findAll, findById, create, deleteById, updateById };
};
exports.ItemService = ItemService;


/***/ }),

/***/ 7767:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.officeInvitationLogger = exports.cloudLogger = exports.officeItemLogger = exports.mailLogger = exports.messageService = exports.authLogger = exports.userLogger = exports.serverLogger = void 0;
const winston_1 = __webpack_require__(7773);
const debugFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`));
const defaultFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.json());
const commonOptions = {
    filename: 'logs/log.log',
    format: defaultFormat,
    maxFiles: 1000,
    maxsize: 5 * 1024 * 1024
};
const debugOptions = {
    format: debugFormat,
    level: 'debug'
};
exports.serverLogger = (0, winston_1.createLogger)({
    defaultMeta: { service: 'server' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});
exports.userLogger = (0, winston_1.createLogger)({
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});
exports.authLogger = (0, winston_1.createLogger)({
    defaultMeta: { service: 'auth-service' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});
exports.messageService = (0, winston_1.createLogger)({
    defaultMeta: { service: 'message-service' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});
exports.mailLogger = (0, winston_1.createLogger)({
    defaultMeta: { service: 'mail-service' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});
exports.officeItemLogger = (0, winston_1.createLogger)({
    defaultMeta: { service: 'office-items-service' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});
exports.cloudLogger = (0, winston_1.createLogger)({
    defaultMeta: { service: 'cloud-service' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});
exports.officeInvitationLogger = (0, winston_1.createLogger)({
    defaultMeta: { service: 'office-invitation-service' },
    transports: [
        new winston_1.transports.File(commonOptions),
        new winston_1.transports.Console(debugOptions)
    ]
});


/***/ }),

/***/ 4678:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailCacheService = void 0;
const MailCacheService = (cacheConnection) => {
    const PREFIX = 'mail_template';
    const setMailTemplate = (templateUrl, content, opts) => __awaiter(void 0, void 0, void 0, function* () {
        yield cacheConnection.set(`${PREFIX}:${templateUrl}`, content, {
            EX: (opts === null || opts === void 0 ? void 0 : opts.mailTemplateExpireSeconds) || 30 * 60
        });
    });
    const getMailTemplate = (templateUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield cacheConnection.get(`${PREFIX}:${templateUrl}`);
        return result;
    });
    return { setMailTemplate, getMailTemplate };
};
exports.MailCacheService = MailCacheService;


/***/ }),

/***/ 1876:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMailCacheService = exports.createMailService = void 0;
const cache_1 = __webpack_require__(366);
const logger_1 = __webpack_require__(7767);
const mail_cache_1 = __webpack_require__(4678);
const mail_service_1 = __webpack_require__(1683);
const createMailService = () => {
    const mailCache = createMailCacheService();
    return (0, mail_service_1.MailService)(mailCache, logger_1.mailLogger);
};
exports.createMailService = createMailService;
function createMailCacheService() {
    return (0, mail_cache_1.MailCacheService)((0, cache_1.getCacheConnection)('mail'));
}
exports.createMailCacheService = createMailCacheService;


/***/ }),

/***/ 1683:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const fs_1 = __importDefault(__webpack_require__(7147));
const util_1 = __importDefault(__webpack_require__(3837));
const config_1 = __importDefault(__webpack_require__(2275));
const handlebars_1 = __importDefault(__webpack_require__(2097));
const nodemailer_1 = __importDefault(__webpack_require__(5184));
let transporter;
const MailService = (mailCache, logger) => {
    const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
        transporter = nodemailer_1.default.createTransport({
            service: config_1.default.mail.EMAIL_SERVICE_NAME,
            host: config_1.default.mail.EMAIL_SERVICE_HOST,
            port: config_1.default.mail.EMAIL_SERVICE_PORT,
            secure: false,
            pool: true,
            maxMessages: Infinity,
            maxConnections: 20,
            auth: {
                user: config_1.default.mail.EMAIL_SERVICE_USERNAME,
                pass: config_1.default.mail.EMAIL_SERVICE_PASSWORD
            }
        });
        logger.info('Start verify SMTP');
        try {
            const success = yield util_1.default.promisify(transporter.verify)();
            success && logger.info('SMTP ready...');
        }
        catch (err) {
            logger.error(`SMTP Error: ${err}`);
            logger.error('SMTP not ready!');
            throw err;
        }
    });
    const sendBulkMails = (options) => __awaiter(void 0, void 0, void 0, function* () {
        options.map((opt) => __awaiter(void 0, void 0, void 0, function* () { return yield sendMail(opt); }));
    });
    const sendMail = (option) => __awaiter(void 0, void 0, void 0, function* () {
        const { from, to, context, subject, templateUrl } = option;
        const htmlTemplate = yield getHtmlTemplate(templateUrl);
        const compiledTemplate = handlebars_1.default.compile(htmlTemplate);
        const renderedTemplate = compiledTemplate(Object.assign({}, context));
        const nodeMailerOptions = {
            from: from,
            to: to,
            subject: subject,
            html: renderedTemplate
        };
        const result = yield transporter.sendMail(nodeMailerOptions);
        return {
            acceptedRecipients: result.accepted,
            rejectedRecipients: result.rejected,
            response: result.response
        };
    });
    function getHtmlTemplate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlTemplateCached = yield mailCache.getMailTemplate(url);
            if (htmlTemplateCached) {
                return htmlTemplateCached;
            }
            const htmlTemplate = fs_1.default.readFileSync(url).toString();
            if (!htmlTemplate)
                throw new Error(`Template file ${url} is not found`);
            return htmlTemplate;
        });
    }
    return { initialize, sendBulkMails, sendMail };
};
exports.MailService = MailService;


/***/ }),

/***/ 1421:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePrivateInvitationDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class CreatePrivateInvitationDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEmail)({ message: 'Invited email is not valid' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreatePrivateInvitationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'Office id must be specified' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreatePrivateInvitationDto.prototype, "officeId", void 0);
exports.CreatePrivateInvitationDto = CreatePrivateInvitationDto;


/***/ }),

/***/ 5845:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationMailQueueProducer = void 0;
const OfficeInvitationMailQueueProducer = (queue) => {
    const addPrivateOfficeInviteJob = (invitation, clientUrl) => {
        queue.add('invitation', { invitation, clientUrl });
    };
    return { addPrivateOfficeInviteJob };
};
exports.OfficeInvitationMailQueueProducer = OfficeInvitationMailQueueProducer;


/***/ }),

/***/ 9271:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationMailWorker = void 0;
const path_1 = __importDefault(__webpack_require__(1017));
const OfficeInvitationMailWorker = (queue, mailService, logger) => {
    const load = () => {
        loadPrivateOfficeInviteJob();
    };
    function loadPrivateOfficeInviteJob() {
        queue.process('invitation', 10, (job) => __awaiter(this, void 0, void 0, function* () {
            const officeInvitation = job.data.invitation;
            const clientUrl = job.data.clientUrl;
            if (!officeInvitation) {
                const err = 'Office invitation is not defined';
                logger.error(err);
                throw new Error(err);
            }
            logger.info(`Start sending office invitation to ${officeInvitation.invitedEmail}`);
            const result = yield mailService.sendMail({
                from: 'ViSpace <noreply@authentication.vispace.tech>',
                to: officeInvitation.invitedEmail,
                subject: 'You have been invited to join a ViSpace office',
                templateUrl: path_1.default.resolve('src/components/mailTemplates/privateInvitation.html'),
                context: {
                    invitationUrl: `${clientUrl}/invites/token/${officeInvitation.token}`
                }
            });
            logger.info(`Invitation link has sent to ${officeInvitation.invitedEmail} successfully`);
        }));
    }
    return { load };
};
exports.OfficeInvitationMailWorker = OfficeInvitationMailWorker;


/***/ }),

/***/ 5284:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationRouter = void 0;
const express_1 = __webpack_require__(6860);
const rateLimit_1 = __webpack_require__(4420);
const auth_factory_1 = __webpack_require__(6901);
const officeInvitation_factory_1 = __webpack_require__(9022);
const OfficeInvitationRouter = () => {
    const router = (0, express_1.Router)();
    const authMiddleware = (0, auth_factory_1.createAuthMiddleware)();
    const officeController = (0, officeInvitation_factory_1.createOfficeInvitationController)();
    router.use(authMiddleware.protect);
    router.post('/token/:inviteToken/join', officeController.joinWithPrivateInvitation);
    router.get('/token/:inviteToken', officeController.getPrivateInvitation);
    router.post('/:inviteCode/join', officeController.joinWithPublicInvitation);
    router.get('/:inviteCode', officeController.getPublicInvitation);
    router
        .use((0, rateLimit_1.rateLimiting)({ maxPerIp: 5, timeMs: 1000 }))
        .post('/', officeController.createOfficeInvitationByEmail);
    return router;
};
exports.OfficeInvitationRouter = OfficeInvitationRouter;


/***/ }),

/***/ 1966:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationController = void 0;
const config_1 = __importDefault(__webpack_require__(2275));
const httpStatusCode_1 = __webpack_require__(7500);
const appError_1 = __webpack_require__(2720);
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const requestValidation_1 = __webpack_require__(5718);
const CreatePrivateInvitation_dto_1 = __webpack_require__(1421);
const OfficeInvitationController = (officeInvitationService, officeInvitationMailQueueProducer) => {
    const createOfficeInvitationByEmail = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, requestValidation_1.validateRequestBody)(CreatePrivateInvitation_dto_1.CreatePrivateInvitationDto, req.body);
        if (errors.length > 0)
            throw new appError_1.IllegalArgumentError('Invalid invitation data', errors);
        const createInvitationDto = req.body;
        const officeInvitation = yield officeInvitationService.createPrivateInvitation(Object.assign(Object.assign({}, createInvitationDto), { inviterId: req.user.id }));
        const clientUrl = config_1.default.app.CLIENT_DOMAIN;
        officeInvitationMailQueueProducer.addPrivateOfficeInviteJob(officeInvitation, clientUrl);
        res.status(httpStatusCode_1.HttpStatusCode.CREATED).json({
            message: 'Invitation has been sent'
        });
    }));
    const getPrivateInvitation = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.params.inviteToken;
        const invitation = yield officeInvitationService.findPrivateInvitation(req.user.id, token);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({ data: { invitation } });
    }));
    const getPublicInvitation = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const officeInviteCode = req.params.inviteCode;
        const invitation = yield officeInvitationService.findPublicInvitation(req.user.id, officeInviteCode);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({ data: { invitation } });
    }));
    const joinWithPrivateInvitation = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.params.inviteToken;
        yield officeInvitationService.acceptPrivateInvitation(req.user.id, token);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({ message: 'Joined' });
    }));
    const joinWithPublicInvitation = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const officeInviteCode = req.params.inviteCode;
        yield officeInvitationService.acceptPublicInvitation(req.user.id, officeInviteCode);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({ message: 'Joined' });
    }));
    const deleteInvitation = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
    return {
        createOfficeInvitationByEmail,
        getPrivateInvitation,
        getPublicInvitation,
        joinWithPrivateInvitation,
        joinWithPublicInvitation,
        deleteInvitation
    };
};
exports.OfficeInvitationController = OfficeInvitationController;


/***/ }),

/***/ 9115:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationCreator = void 0;
const OfficeInvitationCreator = (officeInvitationRepository, officeRepository) => {
    const createPrivateOfficeInvitationByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const officeInvitation = yield officeInvitationRepository
            .createQueryBuilder('office_invitation')
            .where('office_invitation.token = :token', { token })
            .leftJoinAndSelect('office_invitation.office', 'office')
            .leftJoinAndSelect('office_invitation.createdBy', 'user')
            .getOne();
        const { office, createdBy, invitedEmail } = officeInvitation;
        return {
            id: officeInvitation.id,
            inviter: {
                id: createdBy.id,
                email: createdBy.email,
                name: createdBy.name
            },
            invitedEmail,
            token: officeInvitation.token,
            office: {
                id: office.id,
                name: office.name,
                invitationCode: office.invitationCode,
                createdAt: office.createdAt
            }
        };
    });
    const createPublicOfficeInvitation = (invitationCode) => __awaiter(void 0, void 0, void 0, function* () {
        const office = yield officeRepository
            .queryBuilder()
            .findByInvitationCode(invitationCode)
            .build()
            .getOne();
        const { id, createdAt, name } = office;
        return {
            office: {
                id,
                invitationCode,
                name,
                createdAt
            }
        };
    });
    return {
        createPrivateOfficeInvitationByToken,
        createPublicOfficeInvitation
    };
};
exports.OfficeInvitationCreator = OfficeInvitationCreator;


/***/ }),

/***/ 9916:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitation = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
const user_entity_1 = __webpack_require__(4614);
const office_entity_1 = __webpack_require__(4843);
let OfficeInvitation = class OfficeInvitation extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OfficeInvitation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OfficeInvitation.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'office_id' }),
    __metadata("design:type", Number)
], OfficeInvitation.prototype, "officeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id' }),
    __metadata("design:type", Number)
], OfficeInvitation.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invited_email' }),
    __metadata("design:type", String)
], OfficeInvitation.prototype, "invitedEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expired_at' }),
    __metadata("design:type", Date)
], OfficeInvitation.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_user_id' }),
    __metadata("design:type", user_entity_1.User)
], OfficeInvitation.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => office_entity_1.Office, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'office_id' }),
    __metadata("design:type", office_entity_1.Office)
], OfficeInvitation.prototype, "office", void 0);
OfficeInvitation = __decorate([
    (0, typeorm_1.Entity)({ name: 'office_invitation' })
], OfficeInvitation);
exports.OfficeInvitation = OfficeInvitation;


/***/ }),

/***/ 7418:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationErrorMessages = void 0;
exports.OfficeInvitationErrorMessages = {
    INVITATION_NOT_FOUND: 'Office invitation not found',
    INVITATION_EXPIRED: 'Office invitation expired',
    ALREADY_USED: 'Office invitation already used',
    INVALID_INVITATION_TOKEN: 'Office invitation token invalid',
    INVALID_INVITED_EMAIL: 'Invitation token is not valid for this user',
    INVALID_INVITER: 'Inviter is not valid',
    ALREADY_INVITED: 'User is already a member in office',
    INVITER_NOT_IN_OFFICE: 'User is not a member of office'
};


/***/ }),

/***/ 9022:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOfficeInvitationRepository = exports.createOfficeInvitationTokenGenerator = exports.createOfficeInvitationValidate = exports.createOfficeInvitationCreator = exports.createOfficeInvitationMailWorker = exports.createOfficeInvitationMailProducer = exports.createOfficeInvitationService = exports.createOfficeInvitationController = void 0;
const typeorm_1 = __webpack_require__(5250);
const queue_1 = __webpack_require__(247);
const logger_1 = __webpack_require__(7767);
const mail_factory_1 = __webpack_require__(1876);
const officeInvitationTokenGenerator_1 = __webpack_require__(1522);
const officeMember_factory_1 = __webpack_require__(4491);
const officeRole_factory_1 = __webpack_require__(9842);
const office_factory_1 = __webpack_require__(4903);
const user_factory_1 = __webpack_require__(6586);
const mail_producer_1 = __webpack_require__(5845);
const mail_worker_1 = __webpack_require__(9271);
const officeInvitation_controller_1 = __webpack_require__(1966);
const officeInvitation_creator_1 = __webpack_require__(9115);
const officeInvitation_repository_1 = __webpack_require__(6145);
const officeInvitation_service_1 = __webpack_require__(5272);
const officeInvitation_validate_1 = __webpack_require__(6766);
function createOfficeInvitationController() {
    const service = createOfficeInvitationService();
    const mailProducer = createOfficeInvitationMailProducer();
    return (0, officeInvitation_controller_1.OfficeInvitationController)(service, mailProducer);
}
exports.createOfficeInvitationController = createOfficeInvitationController;
function createOfficeInvitationService() {
    const officeInvitationRepository = createOfficeInvitationRepository();
    const officeRepository = (0, office_factory_1.createOfficeRepository)();
    const officeInvitationValidate = createOfficeInvitationValidate();
    const officeMemberRepository = (0, officeMember_factory_1.createOfficeMemberRepository)();
    const officeRoleRepository = (0, officeRole_factory_1.createOfficeRoleRepository)();
    const officeInvitationCreator = createOfficeInvitationCreator();
    const officeInvitationTokenGenerator = createOfficeInvitationTokenGenerator();
    return (0, officeInvitation_service_1.OfficeInvitationService)({
        officeInvitationCreator,
        officeRepository,
        officeInvitationRepository,
        officeInvitationTokenGenerator,
        officeInvitationValidate,
        officeMemberRepository,
        officeRoleRepository
    });
}
exports.createOfficeInvitationService = createOfficeInvitationService;
function createOfficeInvitationMailProducer() {
    const queue = (0, queue_1.getQueue)('office_invitation');
    return (0, mail_producer_1.OfficeInvitationMailQueueProducer)(queue);
}
exports.createOfficeInvitationMailProducer = createOfficeInvitationMailProducer;
function createOfficeInvitationMailWorker() {
    const queue = (0, queue_1.getQueue)('office_invitation');
    const mailService = (0, mail_factory_1.createMailService)();
    return (0, mail_worker_1.OfficeInvitationMailWorker)(queue, mailService, logger_1.officeInvitationLogger);
}
exports.createOfficeInvitationMailWorker = createOfficeInvitationMailWorker;
function createOfficeInvitationCreator() {
    const officeInvitationRepository = createOfficeInvitationRepository();
    const officeRepository = (0, office_factory_1.createOfficeRepository)();
    return (0, officeInvitation_creator_1.OfficeInvitationCreator)(officeInvitationRepository, officeRepository);
}
exports.createOfficeInvitationCreator = createOfficeInvitationCreator;
function createOfficeInvitationValidate() {
    const officeInvitationRepository = createOfficeInvitationRepository();
    const officeMemberRepository = (0, officeMember_factory_1.createOfficeMemberRepository)();
    const officeRepository = (0, office_factory_1.createOfficeRepository)();
    const userRepository = (0, user_factory_1.createUserRepository)();
    return (0, officeInvitation_validate_1.OfficeInvitationValidate)({
        officeInvitationRepository,
        officeRepository,
        officeMemberRepository,
        userRepository
    });
}
exports.createOfficeInvitationValidate = createOfficeInvitationValidate;
function createOfficeInvitationTokenGenerator() {
    return (0, officeInvitationTokenGenerator_1.OfficeInvitationTokenGenerator)();
}
exports.createOfficeInvitationTokenGenerator = createOfficeInvitationTokenGenerator;
function createOfficeInvitationRepository() {
    return (0, typeorm_1.getCustomRepository)(officeInvitation_repository_1.OfficeInvitationRepository);
}
exports.createOfficeInvitationRepository = createOfficeInvitationRepository;


/***/ }),

/***/ 1868:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadInvitationBackgroundJobs = void 0;
const officeInvitation_factory_1 = __webpack_require__(9022);
const loadInvitationBackgroundJobs = () => {
    const officeInvitationMailWorker = (0, officeInvitation_factory_1.createOfficeInvitationMailWorker)();
    officeInvitationMailWorker.load();
};
exports.loadInvitationBackgroundJobs = loadInvitationBackgroundJobs;


/***/ }),

/***/ 6145:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseRepository_1 = __webpack_require__(7325);
const officeInvitation_entity_1 = __webpack_require__(9916);
let OfficeInvitationRepository = class OfficeInvitationRepository extends BaseRepository_1.BaseRepository {
    existsOfficeInvitationToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.createQueryBuilder('office_invitation')
                .where('office_invitation.token = :token', { token })
                .getCount();
            return count === 1;
        });
    }
    findByInvitationToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('office_invitation')
                .where('office_invitation.token = :token', { token })
                .getOne();
        });
    }
    findOfficeInvitationByInvitedEmailAndInvitationToken(invitedEmail, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('office_invitation')
                .where('office_invitation.token = :token', { token: token })
                .andWhere('office_invitation.invited_email = :invitedEmail', {
                invitedEmail: invitedEmail
            })
                .getOne();
        });
    }
};
OfficeInvitationRepository = __decorate([
    (0, typeorm_1.EntityRepository)(officeInvitation_entity_1.OfficeInvitation)
], OfficeInvitationRepository);
exports.OfficeInvitationRepository = OfficeInvitationRepository;


/***/ }),

/***/ 5272:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationService = void 0;
const typeorm_1 = __webpack_require__(5250);
const OfficeRoleType_1 = __webpack_require__(1548);
const officeInvitation_entity_1 = __webpack_require__(9916);
const OfficeInvitationService = ({ officeInvitationRepository, officeRepository, officeMemberRepository, officeRoleRepository, officeInvitationCreator, officeInvitationValidate, officeInvitationTokenGenerator }) => {
    const createPrivateInvitation = (createInvitationDto) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeInvitationValidate.checkCreatePrivateInvitation(createInvitationDto);
        const { inviterId, email, officeId } = createInvitationDto;
        const token = officeInvitationTokenGenerator.generate();
        yield officeInvitationRepository.save({
            createdByUserId: inviterId,
            officeId,
            invitedEmail: email,
            token,
            expiredAt: new Date(Date.now() + 30 * 60 * 1000)
        });
        return officeInvitationCreator.createPrivateOfficeInvitationByToken(token);
    });
    const findPrivateInvitation = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeInvitationValidate.checkUserCanJoinByPrivateInvitation(userId, token);
        const officeInvitation = yield officeInvitationCreator.createPrivateOfficeInvitationByToken(token);
        return officeInvitation;
    });
    const findPublicInvitation = (userId, inviteCode) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeInvitationValidate.checkUserCanJoinByPublicInvitation(userId, inviteCode);
        const officeInvitation = yield officeInvitationCreator.createPublicOfficeInvitation(inviteCode);
        return officeInvitation;
    });
    const acceptPrivateInvitation = (userId, inviteToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeInvitationValidate.checkUserCanJoinByPrivateInvitation(userId, inviteToken);
        const officeInvitation = yield officeInvitationRepository.findByInvitationToken(inviteToken);
        const memberRole = yield officeRoleRepository.findOfficeRoleByName(OfficeRoleType_1.OfficeRoleType.MEMBER);
        (0, typeorm_1.getManager)().transaction((transactionManager) => __awaiter(void 0, void 0, void 0, function* () {
            const officeMember = officeMemberRepository.create({
                officeId: officeInvitation.officeId,
                memberId: userId,
                roles: [{ officeRoleId: memberRole.id }],
                transform: {}
            });
            yield transactionManager.save(officeMember);
            yield transactionManager.remove(officeInvitation_entity_1.OfficeInvitation, officeInvitation);
        }));
    });
    const acceptPublicInvitation = (userId, inviteCode) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeInvitationValidate.checkUserCanJoinByPublicInvitation(userId, inviteCode);
        const office = yield officeRepository
            .queryBuilder()
            .findByInvitationCode(inviteCode)
            .build()
            .getOne();
        const memberRole = yield officeRoleRepository.findOfficeRoleByName(OfficeRoleType_1.OfficeRoleType.MEMBER);
        yield officeMemberRepository.save({
            officeId: office.id,
            memberId: userId,
            transform: {},
            roles: [{ officeRoleId: memberRole.id }]
        });
    });
    const deleteInvitation = (inviteToken) => __awaiter(void 0, void 0, void 0, function* () { });
    return {
        createPrivateInvitation,
        findPrivateInvitation,
        findPublicInvitation,
        acceptPrivateInvitation,
        acceptPublicInvitation,
        deleteInvitation
    };
};
exports.OfficeInvitationService = OfficeInvitationService;


/***/ }),

/***/ 6766:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationValidate = void 0;
const appError_1 = __webpack_require__(2720);
const officeInvitation_error_1 = __webpack_require__(7418);
const OfficeInvitationValidate = ({ officeInvitationRepository, officeRepository, officeMemberRepository, userRepository }) => {
    const checkCreatePrivateInvitation = (invitationDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, inviterId, officeId } = invitationDto;
        yield checkInviterInOffice(inviterId, officeId);
        yield checkUserIsNotMemberByEmail(email, officeId);
    });
    const checkUserCanJoinByPrivateInvitation = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.findById(userId);
        if (!user) {
            throw new appError_1.NotFoundError('User not found');
        }
        const officeInvitation = yield officeInvitationRepository.findOfficeInvitationByInvitedEmailAndInvitationToken(user.email, token);
        if (!officeInvitation) {
            throw new appError_1.NotFoundError(officeInvitation_error_1.OfficeInvitationErrorMessages.INVITATION_NOT_FOUND);
        }
        if (officeInvitation.expiredAt.getTime() < Date.now()) {
            throw new appError_1.IllegalArgumentError(officeInvitation_error_1.OfficeInvitationErrorMessages.INVITATION_EXPIRED);
        }
        yield checkUserIsNotMember(userId, officeInvitation.officeId);
    });
    const checkUserCanJoinByPublicInvitation = (userId, inviteCode) => __awaiter(void 0, void 0, void 0, function* () {
        const office = yield officeRepository
            .queryBuilder()
            .findByInvitationCode(inviteCode)
            .build()
            .getOne();
        if (!office)
            throw new appError_1.NotFoundError(officeInvitation_error_1.OfficeInvitationErrorMessages.INVITATION_NOT_FOUND);
        yield checkUserIsNotMember(userId, office.id);
    });
    function checkUserIsNotMember(userId, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield officeMemberRepository.existsUserInOffice(userId, officeId);
            if (userExists) {
                throw new appError_1.IllegalArgumentError(officeInvitation_error_1.OfficeInvitationErrorMessages.ALREADY_INVITED);
            }
        });
    }
    function checkUserIsNotMemberByEmail(userEmail, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const officeMember = yield officeMemberRepository.existsUserEmailInOffice(userEmail, officeId);
            if (officeMember) {
                throw new appError_1.IllegalArgumentError(officeInvitation_error_1.OfficeInvitationErrorMessages.ALREADY_INVITED);
            }
        });
    }
    function checkInviterInOffice(inviterId, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const officeMemberExists = yield officeMemberRepository.existsUserInOffice(inviterId, officeId);
            if (!officeMemberExists)
                throw new appError_1.IllegalArgumentError(officeInvitation_error_1.OfficeInvitationErrorMessages.INVITER_NOT_IN_OFFICE);
        });
    }
    return {
        checkCreatePrivateInvitation,
        checkUserCanJoinByPrivateInvitation,
        checkUserCanJoinByPublicInvitation
    };
};
exports.OfficeInvitationValidate = OfficeInvitationValidate;


/***/ }),

/***/ 8293:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const nanoid_1 = __webpack_require__(754);
const generator = {
    generate: () => {
        const nanoid = (0, nanoid_1.customAlphabet)('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        return nanoid(9);
    }
};
exports["default"] = generator;


/***/ }),

/***/ 1522:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeInvitationTokenGenerator = void 0;
const uuid_1 = __webpack_require__(5828);
const OfficeInvitationTokenGenerator = () => {
    const generate = () => {
        return (0, uuid_1.v4)();
    };
    return { generate };
};
exports.OfficeInvitationTokenGenerator = OfficeInvitationTokenGenerator;


/***/ }),

/***/ 9817:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemRouter = void 0;
const officeItem_api_1 = __webpack_require__(7704);
Object.defineProperty(exports, "OfficeItemRouter", ({ enumerable: true, get: function () { return officeItem_api_1.OfficeItemRouter; } }));


/***/ }),

/***/ 7704:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemRouter = void 0;
const express_1 = __webpack_require__(6860);
const auth_factory_1 = __webpack_require__(6901);
const officeItem_factory_1 = __webpack_require__(4509);
const OfficeItemRouter = () => {
    const router = (0, express_1.Router)();
    const authMiddleware = (0, auth_factory_1.createAuthMiddleware)();
    const officeItemController = (0, officeItem_factory_1.createOfficeItemController)();
    router.use(authMiddleware.protect);
    router
        .route('/:id')
        .get(officeItemController.getOfficeItemDetailById)
        .delete(officeItemController.deleteOfficeItemById);
    router.route('/').get(officeItemController.getOfficeItemsDetail);
    return router;
};
exports.OfficeItemRouter = OfficeItemRouter;


/***/ }),

/***/ 6002:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemController = void 0;
const httpStatusCode_1 = __webpack_require__(7500);
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const pageParser_1 = __webpack_require__(1624);
const OfficeItemController = (officeItemService) => {
    const getOfficeItemDetailById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        const officeItemDto = yield officeItemService.findOfficeItemDetailById(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            officeItem: officeItemDto
        });
    }));
    const getOfficeItemsDetail = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const pageable = (0, pageParser_1.pageParser)(req.query, {
            defaultPage: 1,
            defaultSize: 10
        });
        const [offices, total] = yield officeItemService.findOfficeItemsDetail(pageable);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            page: pageable.page,
            limit: pageable.size,
            total,
            offices
        });
    }));
    const deleteOfficeItemById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        yield officeItemService.deleteOfficeItem(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success'
        });
    }));
    const updateOfficeItemById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success'
        });
    }));
    return {
        getOfficeItemDetailById,
        getOfficeItemsDetail,
        deleteOfficeItemById,
        updateOfficeItemById
    };
};
exports.OfficeItemController = OfficeItemController;


/***/ }),

/***/ 2965:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItem = void 0;
const typeorm_1 = __webpack_require__(5250);
const item_entity_1 = __webpack_require__(1993);
const office_entity_1 = __webpack_require__(4843);
const BaseEntity_1 = __webpack_require__(777);
let OfficeItem = class OfficeItem extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OfficeItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'item_id' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'office_id' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "officeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'x_rotation' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "xRotation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'y_rotation' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "yRotation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'z_rotation' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "zRotation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'x_position' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "xPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'y_position' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "yPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'z_position' }),
    __metadata("design:type", Number)
], OfficeItem.prototype, "zPosition", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_entity_1.Item),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    __metadata("design:type", item_entity_1.Item)
], OfficeItem.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => office_entity_1.Office),
    (0, typeorm_1.JoinColumn)({ name: 'office_id' }),
    __metadata("design:type", office_entity_1.Office)
], OfficeItem.prototype, "office", void 0);
OfficeItem = __decorate([
    (0, typeorm_1.Entity)({ name: 'office_item' })
], OfficeItem);
exports.OfficeItem = OfficeItem;


/***/ }),

/***/ 4275:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemErrorMessages = void 0;
exports.OfficeItemErrorMessages = {
    OFFICE_ITEM_NOT_FOUND: 'Office item not found'
};


/***/ }),

/***/ 4509:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOfficeItemRepository = exports.createOfficeItemValidate = exports.createOfficeItemService = exports.createOfficeItemSocketService = exports.createOfficeItemController = void 0;
const typeorm_1 = __webpack_require__(5250);
const officeItem_controller_1 = __webpack_require__(6002);
const officeItem_repository_1 = __webpack_require__(1269);
const officeItem_service_1 = __webpack_require__(8743);
const officeItemSocket_service_1 = __webpack_require__(7510);
const officeItemValidate_1 = __webpack_require__(9394);
function createOfficeItemController() {
    const officeItemService = createOfficeItemService();
    return (0, officeItem_controller_1.OfficeItemController)(officeItemService);
}
exports.createOfficeItemController = createOfficeItemController;
function createOfficeItemSocketService(io, socket) {
    const officeItemService = createOfficeItemService();
    return (0, officeItemSocket_service_1.OfficeItemSocketService)(io, socket, officeItemService);
}
exports.createOfficeItemSocketService = createOfficeItemSocketService;
function createOfficeItemService() {
    const officeItemRepository = (0, typeorm_1.getCustomRepository)(officeItem_repository_1.OfficeItemRepository);
    const officeItemValidate = createOfficeItemValidate();
    return (0, officeItem_service_1.OfficeItemService)(officeItemRepository, officeItemValidate);
}
exports.createOfficeItemService = createOfficeItemService;
function createOfficeItemValidate() {
    const officeItemRepository = (0, typeorm_1.getCustomRepository)(officeItem_repository_1.OfficeItemRepository);
    return (0, officeItemValidate_1.OfficeItemValidate)(officeItemRepository);
}
exports.createOfficeItemValidate = createOfficeItemValidate;
function createOfficeItemRepository() {
    return (0, typeorm_1.getCustomRepository)(officeItem_repository_1.OfficeItemRepository);
}
exports.createOfficeItemRepository = createOfficeItemRepository;


/***/ }),

/***/ 7437:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapOfficeItemToOfficeItemDetailDto = exports.mapOfficeItemToOfficeItemOverviewDto = void 0;
const item_mapping_1 = __webpack_require__(5767);
const office_mapping_1 = __webpack_require__(9855);
const mapOfficeItemToOfficeItemOverviewDto = (officeItem) => {
    const { id, item, officeId, createdAt } = officeItem, transform = __rest(officeItem, ["id", "item", "officeId", "createdAt"]);
    return { id, officeId, transform, createdAt, item: (0, item_mapping_1.mapItemToItemDto)(item) };
};
exports.mapOfficeItemToOfficeItemOverviewDto = mapOfficeItemToOfficeItemOverviewDto;
const mapOfficeItemToOfficeItemDetailDto = (officeItem) => {
    const { id, item, office, createdAt } = officeItem, transform = __rest(officeItem, ["id", "item", "office", "createdAt"]);
    return {
        id,
        item: (0, item_mapping_1.mapItemToItemDto)(item),
        office: (0, office_mapping_1.mapOfficeToOfficeOverviewDto)(office),
        transform,
        createdAt
    };
};
exports.mapOfficeItemToOfficeItemDetailDto = mapOfficeItemToOfficeItemDetailDto;


/***/ }),

/***/ 1269:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const officeItem_entity_1 = __webpack_require__(2965);
const BaseRepository_1 = __webpack_require__(7325);
let OfficeItemRepository = class OfficeItemRepository extends BaseRepository_1.BaseRepository {
    existsOfficeItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.createQueryBuilder('office_item')
                .where('office_item.id = :id', { id })
                .getCount();
            return count === 1;
        });
    }
    updateOfficeItemTransformById(id, transform) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update(id, Object.assign({}, transform));
        });
    }
    findOfficeItemWithItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('office_item')
                .leftJoinAndSelect('office_item.item', 'item')
                .where('office_item.id = :id', { id })
                .getOne();
        });
    }
    findOfficeItemWithItemAndOfficeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('office_item')
                .leftJoinAndSelect('office_item.item', 'item')
                .leftJoinAndSelect('office_item.office', 'office')
                .where('office_item.id = :id', { id })
                .getOne();
        });
    }
    findOfficeItemsWithItemAndOffice(pageable) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, size } = pageable;
            return this.createQueryBuilder('office_item')
                .leftJoinAndSelect('office_item.item', 'item')
                .leftJoinAndSelect('office_item.office', 'office')
                .skip((page - 1) * size)
                .limit(size)
                .getMany();
        });
    }
    findOfficeItemsWithItemByOfficeId(officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('office_item')
                .leftJoinAndSelect('office_item.item', 'item')
                .where('office_item.officeId = :officeId', { officeId })
                .getMany();
        });
    }
};
OfficeItemRepository = __decorate([
    (0, typeorm_1.EntityRepository)(officeItem_entity_1.OfficeItem)
], OfficeItemRepository);
exports.OfficeItemRepository = OfficeItemRepository;


/***/ }),

/***/ 8743:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemService = void 0;
const officeItem_mapping_1 = __webpack_require__(7437);
const OfficeItemService = (officeItemRepository, officeItemValidate) => {
    const createOfficeItem = (createOfficeItemDto) => __awaiter(void 0, void 0, void 0, function* () {
        const officeItem = yield officeItemRepository.save(createOfficeItemDto);
        return (0, officeItem_mapping_1.mapOfficeItemToOfficeItemOverviewDto)(officeItem);
    });
    const updateOfficeItemTransform = (id, transform) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeItemValidate.checkOfficeItemExistsById(id);
        yield officeItemRepository.updateOfficeItemTransformById(id, transform);
        return {
            id,
            transform
        };
    });
    const findOfficeItemDetailById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeItemValidate.checkOfficeItemExistsById(id);
        const officeItem = yield officeItemRepository.findOfficeItemWithItemAndOfficeById(id);
        return (0, officeItem_mapping_1.mapOfficeItemToOfficeItemDetailDto)(officeItem);
    });
    const findOfficeItemsDetail = (pageable) => __awaiter(void 0, void 0, void 0, function* () {
        const items = yield officeItemRepository.findOfficeItemsWithItemAndOffice(pageable);
        const total = yield officeItemRepository.count();
        return [
            items.map(item => (0, officeItem_mapping_1.mapOfficeItemToOfficeItemDetailDto)(item)),
            total
        ];
    });
    const deleteOfficeItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeItemValidate.checkOfficeItemExistsById(id);
        yield officeItemRepository.delete(id);
    });
    return {
        createOfficeItem,
        updateOfficeItemTransform,
        findOfficeItemDetailById,
        findOfficeItemsDetail,
        deleteOfficeItem
    };
};
exports.OfficeItemService = OfficeItemService;


/***/ }),

/***/ 7510:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemSocketService = void 0;
const OfficeItemSocketService = (socketNamespace, socket, officeItemService) => {
    const onOfficeItemCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { itemId, officeId } = data, transform = __rest(data, ["itemId", "officeId"]);
        const officeItem = yield officeItemService.createOfficeItem(Object.assign({ itemId,
            officeId }, transform));
        socket.emit('office_item:created', officeItem);
    });
    const onOfficeItemMove = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, transform } = data;
        socket.emit('office_item:moved', {
            id,
            transform
        });
        yield officeItemService.updateOfficeItemTransform(id, transform);
    });
    const onOfficeItemDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeItemService.deleteOfficeItem(id);
        socket.emit('office_item:deleted', id);
    });
    return { onOfficeItemCreate, onOfficeItemMove, onOfficeItemDelete };
};
exports.OfficeItemSocketService = OfficeItemSocketService;


/***/ }),

/***/ 9394:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeItemValidate = void 0;
const appError_1 = __webpack_require__(2720);
const officeItem_error_1 = __webpack_require__(4275);
const OfficeItemValidate = (officeItemRepository) => {
    const checkOfficeItemExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const isExisted = yield officeItemRepository.existsOfficeItemById(id);
        if (!isExisted)
            throw new appError_1.NotFoundError(officeItem_error_1.OfficeItemErrorMessages.OFFICE_ITEM_NOT_FOUND);
    });
    return { checkOfficeItemExistsById };
};
exports.OfficeItemValidate = OfficeItemValidate;


/***/ }),

/***/ 478:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberRole = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
const officeMember_entity_1 = __webpack_require__(5970);
const officeRole_entity_1 = __webpack_require__(1500);
let OfficeMemberRole = class OfficeMemberRole extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'office_member_id' }),
    __metadata("design:type", Number)
], OfficeMemberRole.prototype, "officeMemberId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'office_role_id' }),
    __metadata("design:type", Number)
], OfficeMemberRole.prototype, "officeRoleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => officeMember_entity_1.OfficeMember, officeMember => officeMember.roles),
    (0, typeorm_1.JoinColumn)({ name: 'office_member_id' }),
    __metadata("design:type", officeMember_entity_1.OfficeMember)
], OfficeMemberRole.prototype, "officeMember", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => officeRole_entity_1.OfficeRole),
    (0, typeorm_1.JoinColumn)({ name: 'office_role_id' }),
    __metadata("design:type", officeRole_entity_1.OfficeRole)
], OfficeMemberRole.prototype, "officeRole", void 0);
OfficeMemberRole = __decorate([
    (0, typeorm_1.Entity)({ name: 'office_member_role' })
], OfficeMemberRole);
exports.OfficeMemberRole = OfficeMemberRole;


/***/ }),

/***/ 5076:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberTransformCacheService = void 0;
const OfficeMemberTransformCacheService = (client) => {
    const CACHE_PREFIX = 'office_member_transform';
    const setTransform = (id, memberTransform) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.set(`${CACHE_PREFIX}:${id}`, JSON.stringify({
            memberTransform
        }));
    });
    const getTransformById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const memberTransform = yield client.get(`${CACHE_PREFIX}:${id}`);
        if (!memberTransform) {
            return undefined;
        }
        return JSON.parse(memberTransform);
    });
    const deleteTransformById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.del(`${id}`);
    });
    const scan = (cursor, chunk) => {
        return client.scan(cursor, { COUNT: chunk });
    };
    const flushAll = () => __awaiter(void 0, void 0, void 0, function* () {
        return client.flushAll();
    });
    return {
        setTransform,
        getTransformById,
        deleteTransformById,
        scan,
        flushAll
    };
};
exports.OfficeMemberTransformCacheService = OfficeMemberTransformCacheService;


/***/ }),

/***/ 1230:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberTransform = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
const officeMember_entity_1 = __webpack_require__(5970);
let OfficeMemberTransform = class OfficeMemberTransform extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'office_member_id' }),
    __metadata("design:type", Number)
], OfficeMemberTransform.prototype, "officeMemberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'x_rotation', default: 0 }),
    __metadata("design:type", Number)
], OfficeMemberTransform.prototype, "xRotation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'y_rotation', default: 0 }),
    __metadata("design:type", Number)
], OfficeMemberTransform.prototype, "yRotation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'z_rotation', default: 0 }),
    __metadata("design:type", Number)
], OfficeMemberTransform.prototype, "zRotation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'x_position', default: 0 }),
    __metadata("design:type", Number)
], OfficeMemberTransform.prototype, "xPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'y_position', default: 0 }),
    __metadata("design:type", Number)
], OfficeMemberTransform.prototype, "yPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'z_position', default: 0 }),
    __metadata("design:type", Number)
], OfficeMemberTransform.prototype, "zPosition", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => officeMember_entity_1.OfficeMember),
    (0, typeorm_1.JoinColumn)({ name: 'office_member_id' }),
    __metadata("design:type", officeMember_entity_1.OfficeMember)
], OfficeMemberTransform.prototype, "officeMember", void 0);
OfficeMemberTransform = __decorate([
    (0, typeorm_1.Entity)({ name: 'office_member_transform' })
], OfficeMemberTransform);
exports.OfficeMemberTransform = OfficeMemberTransform;


/***/ }),

/***/ 8993:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOfficeMemberTransformCache = exports.createOfficeMemberTransformRepository = exports.createOfficeMemberTransformService = void 0;
const typeorm_1 = __webpack_require__(5250);
const cache_1 = __webpack_require__(366);
const officeMemberTransform_cache_1 = __webpack_require__(5076);
const officeMemberTransform_repository_1 = __webpack_require__(1428);
const officeMemberTransform_service_1 = __webpack_require__(5528);
function createOfficeMemberTransformService() {
    const officeMemberTransformRepository = createOfficeMemberTransformRepository();
    const cacheService = createOfficeMemberTransformCache();
    const service = (0, officeMemberTransform_service_1.OfficeMemberTransformService)(officeMemberTransformRepository, cacheService);
    return service;
}
exports.createOfficeMemberTransformService = createOfficeMemberTransformService;
function createOfficeMemberTransformRepository() {
    return (0, typeorm_1.getCustomRepository)(officeMemberTransform_repository_1.OfficeMemberTransformRepository);
}
exports.createOfficeMemberTransformRepository = createOfficeMemberTransformRepository;
function createOfficeMemberTransformCache() {
    const client = (0, cache_1.getCacheConnection)('officeMemberTransform');
    const cacheService = (0, officeMemberTransform_cache_1.OfficeMemberTransformCacheService)(client);
    return cacheService;
}
exports.createOfficeMemberTransformCache = createOfficeMemberTransformCache;


/***/ }),

/***/ 5680:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapOfficeMemberTransformToTransform3D = void 0;
const mapOfficeMemberTransformToTransform3D = (transform) => {
    const { xPosition, yPosition, zPosition, xRotation, yRotation, zRotation } = transform;
    return {
        position: { x: xPosition, y: yPosition, z: zPosition },
        rotation: { x: xRotation, y: yRotation, z: zRotation }
    };
};
exports.mapOfficeMemberTransformToTransform3D = mapOfficeMemberTransformToTransform3D;


/***/ }),

/***/ 1428:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberTransformRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseRepository_1 = __webpack_require__(7325);
const officeMemberTransform_entity_1 = __webpack_require__(1230);
let OfficeMemberTransformRepository = class OfficeMemberTransformRepository extends BaseRepository_1.BaseRepository {
    findTransformByOfficeMemberId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder()
                .where('office_member_id = :id', { id })
                .getOne();
        });
    }
};
OfficeMemberTransformRepository = __decorate([
    (0, typeorm_1.EntityRepository)(officeMemberTransform_entity_1.OfficeMemberTransform)
], OfficeMemberTransformRepository);
exports.OfficeMemberTransformRepository = OfficeMemberTransformRepository;


/***/ }),

/***/ 5528:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberTransformService = void 0;
const appError_1 = __webpack_require__(2720);
const OfficeMemberTransformService = (officeMemberTransformRepository, officeMemberTransformCache) => {
    const updateTransformInCacheById = (officeMemberId, transformDto) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeMemberTransformCache.setTransform(officeMemberId, Object.assign({ officeMemberId }, transformDto));
    });
    const backupTransformFromCacheById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const transform = yield officeMemberTransformCache.getTransformById(id);
        if (transform) {
            yield officeMemberTransformRepository.update(id, Object.assign({}, transform));
            yield officeMemberTransformCache.deleteTransformById(id);
        }
    });
    const findTransformById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const cachedTransform = yield officeMemberTransformCache.getTransformById(id);
        if (cachedTransform) {
            return cachedTransform;
        }
        const transform = yield officeMemberTransformRepository.findById(id);
        if (!transform) {
            throw new appError_1.NotFoundError('Office member transform not found');
        }
        return transform;
    });
    return {
        updateTransformInCacheById,
        backupTransformFromCacheById,
        findTransformById
    };
};
exports.OfficeMemberTransformService = OfficeMemberTransformService;


/***/ }),

/***/ 9366:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberOnlineStatus = void 0;
var OfficeMemberOnlineStatus;
(function (OfficeMemberOnlineStatus) {
    OfficeMemberOnlineStatus["ONLINE"] = "online";
    OfficeMemberOnlineStatus["OFFLINE"] = "offline";
})(OfficeMemberOnlineStatus = exports.OfficeMemberOnlineStatus || (exports.OfficeMemberOnlineStatus = {}));


/***/ }),

/***/ 7114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberRouter = void 0;
const officeMember_api_1 = __webpack_require__(3245);
Object.defineProperty(exports, "OfficeMemberRouter", ({ enumerable: true, get: function () { return officeMember_api_1.OfficeMemberRouter; } }));


/***/ }),

/***/ 3245:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberRouter = void 0;
const express_1 = __webpack_require__(6860);
const auth_factory_1 = __webpack_require__(6901);
const officeMember_factory_1 = __webpack_require__(4491);
const OfficeMemberRouter = () => {
    const router = (0, express_1.Router)();
    const authMiddleware = (0, auth_factory_1.createAuthMiddleware)();
    const officeMemberController = (0, officeMember_factory_1.createOfficeMemberController)();
    router.use(authMiddleware.protect);
    router
        .route('/:id')
        .get(officeMemberController.getOfficeMemberById)
        .delete(officeMemberController.deleteOfficeMember);
    router
        .route('/')
        .get(officeMemberController.getOfficeMembersDetail)
        .post(officeMemberController.addMemberToOffice);
    return router;
};
exports.OfficeMemberRouter = OfficeMemberRouter;


/***/ }),

/***/ 126:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberController = void 0;
const pageParser_1 = __webpack_require__(1624);
const httpStatusCode_1 = __webpack_require__(7500);
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const OfficeMemberController = (officeMemberService) => {
    const getOfficeMemberById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        const officeMember = yield officeMemberService.findOfficeMemberDetailById(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            officeMember
        });
    }));
    const getOfficeMembersDetail = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const pageable = (0, pageParser_1.pageParser)(req.query, {
            defaultPage: 1,
            defaultSize: 10
        });
        const [officeMembers, total] = yield officeMemberService.findOfficeMembersDetail(pageable);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            page: pageable.page,
            limit: pageable.size,
            total,
            officeMembers
        });
    }));
    const deleteOfficeMember = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        yield officeMemberService.deleteOfficeMemberById(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success'
        });
    }));
    const addMemberToOffice = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const createOfficeMemberDto = req.body;
        const officeMember = yield officeMemberService.createOfficeMember(createOfficeMemberDto);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            officeMember
        });
    }));
    return {
        getOfficeMemberById,
        getOfficeMembersDetail,
        deleteOfficeMember,
        addMemberToOffice
    };
};
exports.OfficeMemberController = OfficeMemberController;


/***/ }),

/***/ 7874:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberCreator = void 0;
const officeMember_mapping_1 = __webpack_require__(8164);
const OfficeMemberCreator = (officeMemberRepository) => {
    const createOfficeMemberOverviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const officeMember = yield officeMemberRepository
            .queryBuilder()
            .findById(id)
            .withMember()
            .withTransform()
            .build()
            .getOne();
        return (0, officeMember_mapping_1.mapOfficeMemberToOfficeMemberOverviewDto)(officeMember);
    });
    const createOfficeMemberDetailById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const officeMember = yield officeMemberRepository
            .queryBuilder()
            .findById(id)
            .withMember()
            .withOfficeHasCreator()
            .withTransform()
            .withRoles()
            .build()
            .getOne();
        return (0, officeMember_mapping_1.mapOfficeMemberToOfficeMemberDetailDto)(officeMember);
    });
    const createOfficeMembersOverviewByOfficeId = (officeId) => __awaiter(void 0, void 0, void 0, function* () {
        const officeMembers = yield officeMemberRepository
            .queryBuilder()
            .findByOfficeId(officeId)
            .withMember()
            .withTransform()
            .build()
            .getMany();
        return officeMembers.map(o => (0, officeMember_mapping_1.mapOfficeMemberToOfficeMemberOverviewDto)(o));
    });
    return {
        createOfficeMemberOverviewById,
        createOfficeMemberDetailById,
        createOfficeMembersOverviewByOfficeId
    };
};
exports.OfficeMemberCreator = OfficeMemberCreator;


/***/ }),

/***/ 5970:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMember = void 0;
const typeorm_1 = __webpack_require__(5250);
const office_entity_1 = __webpack_require__(4843);
const user_entity_1 = __webpack_require__(4614);
const BaseEntity_1 = __webpack_require__(777);
const officeMemberTransform_entity_1 = __webpack_require__(1230);
const OfficeMemberOnlineStatus_1 = __webpack_require__(9366);
const officeMemberRole_entity_1 = __webpack_require__(478);
let OfficeMember = class OfficeMember extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OfficeMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id' }),
    __metadata("design:type", Number)
], OfficeMember.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'office_id' }),
    __metadata("design:type", Number)
], OfficeMember.prototype, "officeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'online_status',
        type: 'enum',
        enum: OfficeMemberOnlineStatus_1.OfficeMemberOnlineStatus,
        default: OfficeMemberOnlineStatus_1.OfficeMemberOnlineStatus.OFFLINE
    }),
    __metadata("design:type", String)
], OfficeMember.prototype, "onlineStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", user_entity_1.User)
], OfficeMember.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => office_entity_1.Office, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'office_id' }),
    __metadata("design:type", office_entity_1.Office)
], OfficeMember.prototype, "office", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => officeMemberRole_entity_1.OfficeMemberRole, officeMemberRole => officeMemberRole.officeMember, { cascade: true }),
    __metadata("design:type", Array)
], OfficeMember.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => officeMemberTransform_entity_1.OfficeMemberTransform, officeTransform => officeTransform.officeMember, { cascade: true }),
    __metadata("design:type", officeMemberTransform_entity_1.OfficeMemberTransform)
], OfficeMember.prototype, "transform", void 0);
OfficeMember = __decorate([
    (0, typeorm_1.Entity)({ name: 'office_member' })
], OfficeMember);
exports.OfficeMember = OfficeMember;


/***/ }),

/***/ 4711:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberErrorMessages = void 0;
exports.OfficeMemberErrorMessages = {
    OFFICE_MEMBER_NOT_FOUND: 'Office member not found',
    USER_ALREADY_IN_OFFICE: 'User already existed in office',
    PERMISSION_DENIED: 'Office member not has permission to perform this action'
};


/***/ }),

/***/ 4491:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOfficeMemberRepository = exports.createOfficeMemberCreator = exports.createOfficeMemberValidate = exports.createOfficeMemberCache = exports.createOfficeMemberService = exports.createOfficeMemberSocketService = exports.createOfficeMemberController = void 0;
const typeorm_1 = __webpack_require__(5250);
const cache_1 = __webpack_require__(366);
const officeMemberTransform_factory_1 = __webpack_require__(8993);
const officeMember_controller_1 = __webpack_require__(126);
const officeMember_creator_1 = __webpack_require__(7874);
const officeMember_repository_1 = __webpack_require__(8637);
const officeMember_service_1 = __webpack_require__(2034);
const officeMember_validate_1 = __webpack_require__(3431);
const socket_1 = __webpack_require__(7511);
function createOfficeMemberController() {
    const service = createOfficeMemberService();
    return (0, officeMember_controller_1.OfficeMemberController)(service);
}
exports.createOfficeMemberController = createOfficeMemberController;
function createOfficeMemberSocketService(io, socket) {
    const officeMemberRepository = createOfficeMemberRepository();
    const officeMemberTransformService = (0, officeMemberTransform_factory_1.createOfficeMemberTransformService)();
    const officeMemberCacheService = createOfficeMemberCache();
    return (0, socket_1.OfficeMemberSocketService)(io, socket, officeMemberRepository, officeMemberTransformService, officeMemberCacheService);
}
exports.createOfficeMemberSocketService = createOfficeMemberSocketService;
function createOfficeMemberService() {
    const officeMemberRepository = createOfficeMemberRepository();
    const officeMemberTransformRepository = (0, officeMemberTransform_factory_1.createOfficeMemberTransformRepository)();
    const officeMemberCreator = createOfficeMemberCreator();
    const officeMemberValidate = createOfficeMemberValidate();
    return (0, officeMember_service_1.OfficeMemberService)(officeMemberRepository, officeMemberTransformRepository, officeMemberCreator, officeMemberValidate);
}
exports.createOfficeMemberService = createOfficeMemberService;
function createOfficeMemberCache() {
    const cache = (0, cache_1.getCacheConnection)('officeMember');
    return (0, socket_1.OfficeMemberSocketCacheService)(cache);
}
exports.createOfficeMemberCache = createOfficeMemberCache;
function createOfficeMemberValidate() {
    const officeMemberRepository = createOfficeMemberRepository();
    return (0, officeMember_validate_1.OfficeMemberValidate)(officeMemberRepository);
}
exports.createOfficeMemberValidate = createOfficeMemberValidate;
function createOfficeMemberCreator() {
    const officeMemberRepository = createOfficeMemberRepository();
    return (0, officeMember_creator_1.OfficeMemberCreator)(officeMemberRepository);
}
exports.createOfficeMemberCreator = createOfficeMemberCreator;
function createOfficeMemberRepository() {
    return (0, typeorm_1.getCustomRepository)(officeMember_repository_1.OfficeMemberRepository);
}
exports.createOfficeMemberRepository = createOfficeMemberRepository;


/***/ }),

/***/ 8164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapOfficeMemberToOfficeMemberDetailDto = exports.mapOfficeMemberToOfficeMemberOverviewDto = void 0;
const officeMemberTransform_mapping_1 = __webpack_require__(5680);
const office_mapping_1 = __webpack_require__(9855);
const user_mapping_1 = __webpack_require__(9857);
const mapOfficeMemberToOfficeMemberOverviewDto = (officeMember) => {
    const { id, member, officeId, transform, onlineStatus, roles } = officeMember;
    const memberDto = (0, user_mapping_1.mapUserToUserOverviewDto)(member);
    const transformDto = (0, officeMemberTransform_mapping_1.mapOfficeMemberTransformToTransform3D)(transform);
    return {
        id,
        officeId,
        member: memberDto,
        onlineStatus,
        transform: transformDto
    };
};
exports.mapOfficeMemberToOfficeMemberOverviewDto = mapOfficeMemberToOfficeMemberOverviewDto;
const mapOfficeMemberToOfficeMemberDetailDto = (officeMember) => {
    const { id, member, office, transform, onlineStatus, roles } = officeMember;
    const memberDto = (0, user_mapping_1.mapUserToUserOverviewDto)(member);
    const officeDto = (0, office_mapping_1.mapOfficeToOfficeOverviewDto)(office);
    const transformDto = (0, officeMemberTransform_mapping_1.mapOfficeMemberTransformToTransform3D)(transform);
    const rolesName = roles.map(memberRole => memberRole.officeRole.name);
    return {
        id,
        office: officeDto,
        member: memberDto,
        roles: rolesName,
        onlineStatus,
        transform: transformDto
    };
};
exports.mapOfficeMemberToOfficeMemberDetailDto = mapOfficeMemberToOfficeMemberDetailDto;


/***/ }),

/***/ 8637:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const officeMember_entity_1 = __webpack_require__(5970);
const BaseRepository_1 = __webpack_require__(7325);
const officeMember_repositoryBuilder_1 = __webpack_require__(4350);
let OfficeMemberRepository = class OfficeMemberRepository extends BaseRepository_1.BaseRepository {
    queryBuilder() {
        return new officeMember_repositoryBuilder_1.OfficeMemberRepositoryQueryBuilder(this);
    }
    existsOfficeMemberById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.createQueryBuilder('office_member')
                .where('office_member.id = :id', { id })
                .getCount();
            return count === 1;
        });
    }
    existsUserInOffice(userId, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.createQueryBuilder('office_member')
                .where('office_member.member_id = :userId', { userId })
                .andWhere('office_member.office_id = :officeId', { officeId })
                .getCount();
            return count === 1;
        });
    }
    existsUserEmailInOffice(email, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.createQueryBuilder('office_member')
                .leftJoin('office_member.member', 'user')
                .where('user.email = :email', { email })
                .andWhere('office_member.office_id = :officeId', { officeId })
                .getCount();
            return count === 1;
        });
    }
    setOfficeMemberOnlineStatusById(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createQueryBuilder('office_member')
                .update()
                .where('office_member.id = :id', { id })
                .set({ onlineStatus: status })
                .execute();
        });
    }
    findOfficeMemberByMemberEmailAndOfficeId(email, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('office_member')
                .where('office_member.office_id = :officeId', { officeId })
                .leftJoin('office_member.member', 'user')
                .where('user.email = :email', { email })
                .getOne();
        });
    }
    findOfficeMemberByMemberIdAndOfficeId(memberId, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder('office_member')
                .where('office_member.office_id = :officeId', { officeId })
                .andWhere('office_member.member_id = :memberId', { memberId })
                .getOne();
        });
    }
};
OfficeMemberRepository = __decorate([
    (0, typeorm_1.EntityRepository)(officeMember_entity_1.OfficeMember)
], OfficeMemberRepository);
exports.OfficeMemberRepository = OfficeMemberRepository;


/***/ }),

/***/ 4350:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberRepositoryQueryBuilder = void 0;
const RepositoryQueryBuilder_1 = __webpack_require__(9456);
class OfficeMemberRepositoryQueryBuilder extends RepositoryQueryBuilder_1.RepositoryQueryBuilder {
    constructor(repository) {
        super(repository, 'office_member');
    }
    findById(id) {
        super.findById(id);
        return this;
    }
    findByOfficeId(officeId) {
        this.query.where('office_member.office_id = :officeId', { officeId });
        return this;
    }
    findByMemberId(memberId) {
        this.query.where('office_member.member_id = :memberId', {
            memberId
        });
        return this;
    }
    findByMemberIdAndOfficeId(memberId, officeId) {
        this.query
            .where('office_member.member_id = :memberId', { memberId })
            .andWhere('office_member.office_id = :officeId', { officeId });
        return this;
    }
    findAll() {
        this.query;
        return this;
    }
    withMember() {
        this.query.leftJoinAndSelect('office_member.member', 'user');
        return this;
    }
    withOffice() {
        this.query.leftJoinAndSelect('office_member.office', 'office');
        return this;
    }
    withOfficeHasCreator() {
        this.query
            .leftJoinAndSelect('office_member.office', 'office')
            .leftJoinAndSelect('office.createdBy', 'created_user');
        return this;
    }
    withTransform() {
        this.query.leftJoinAndSelect('office_member.transform', 'office_member_transform');
        return this;
    }
    withRoles() {
        this.query
            .leftJoinAndSelect('office_member.roles', 'office_member_role')
            .leftJoinAndSelect('office_member_role.officeRole', 'office_role');
        return this;
    }
    withPageable(pageable) {
        super.withPageable(pageable);
        return this;
    }
    build() {
        return this.query;
    }
}
exports.OfficeMemberRepositoryQueryBuilder = OfficeMemberRepositoryQueryBuilder;


/***/ }),

/***/ 2034:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberService = void 0;
const appError_1 = __webpack_require__(2720);
const officeMember_error_1 = __webpack_require__(4711);
const officeMember_mapping_1 = __webpack_require__(8164);
const OfficeMemberService = (officeMemberRepository, officeMemberTransformRepository, officeMemberCreator, officeMemberValidate) => {
    const createOfficeMember = (createOfficeMemberDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { memberId, officeId } = createOfficeMemberDto;
        yield officeMemberValidate.checkUniqueUserInOffice(memberId, officeId);
        const createdOfficeMember = yield officeMemberRepository.save({
            memberId,
            officeId,
            transform: {}
        });
        return yield officeMemberCreator.createOfficeMemberOverviewById(createdOfficeMember.id);
    });
    const deleteOfficeMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeMemberValidate.checkExistsOfficeMemberById(id);
        yield officeMemberRepository.delete(id);
    });
    const updateOfficeMemberTransformById = (id, transform) => __awaiter(void 0, void 0, void 0, function* () {
    });
    const findOfficeMemberOverviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield officeMemberCreator.createOfficeMemberOverviewById(id);
    });
    const findOfficeMemberDetailById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield officeMemberCreator.createOfficeMemberDetailById(id);
    });
    const findOfficeMembersDetail = (pageable) => __awaiter(void 0, void 0, void 0, function* () {
        const officeMembers = yield officeMemberRepository
            .queryBuilder()
            .withMember()
            .withOfficeHasCreator()
            .withRoles()
            .withTransform()
            .withPageable(pageable)
            .build()
            .getMany();
        const total = yield officeMemberRepository.count();
        const officeMembersDto = officeMembers.map(om => (0, officeMember_mapping_1.mapOfficeMemberToOfficeMemberDetailDto)(om));
        return [officeMembersDto, total];
    });
    const setOfficeMemberOnlineStatusById = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        const officeMember = yield officeMemberRepository.findOne(id);
        if (!officeMember) {
            throw new appError_1.NotFoundError(officeMember_error_1.OfficeMemberErrorMessages.OFFICE_MEMBER_NOT_FOUND);
        }
        yield officeMemberRepository.setOfficeMemberOnlineStatusById(id, status);
    });
    return {
        createOfficeMember,
        deleteOfficeMemberById,
        updateOfficeMemberTransformById,
        findOfficeMemberOverviewById,
        findOfficeMemberDetailById,
        findOfficeMembersDetail,
        setOfficeMemberOnlineStatusById
    };
};
exports.OfficeMemberService = OfficeMemberService;


/***/ }),

/***/ 3431:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberValidate = void 0;
const appError_1 = __webpack_require__(2720);
const officeMember_error_1 = __webpack_require__(4711);
const OfficeMemberValidate = (officeMemberRepository) => {
    const checkExistsOfficeMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const isExisted = yield officeMemberRepository.existsOfficeMemberById(id);
        if (!isExisted) {
            throw new appError_1.IllegalArgumentError(officeMember_error_1.OfficeMemberErrorMessages.OFFICE_MEMBER_NOT_FOUND);
        }
    });
    const checkUniqueUserInOffice = (userId, officeId) => __awaiter(void 0, void 0, void 0, function* () {
        const memberExisted = yield officeMemberRepository.existsUserInOffice(userId, officeId);
        if (memberExisted) {
            throw new appError_1.IllegalArgumentError(officeMember_error_1.OfficeMemberErrorMessages.USER_ALREADY_IN_OFFICE);
        }
    });
    return {
        checkExistsOfficeMemberById,
        checkUniqueUserInOffice
    };
};
exports.OfficeMemberValidate = OfficeMemberValidate;


/***/ }),

/***/ 7511:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4718), exports);
__exportStar(__webpack_require__(6717), exports);


/***/ }),

/***/ 6717:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberSocketCacheService = void 0;
const OfficeMemberSocketCacheService = (cache) => {
    const PREFIX = 'office_member';
    const setUserSocket = (userId, socketId) => __awaiter(void 0, void 0, void 0, function* () {
        yield cache.set(`${PREFIX}:${userId}`, socketId);
    });
    const getUserSocket = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cache.get(`${PREFIX}:${userId}`);
    });
    const deleteUserSocket = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield cache.del(`${PREFIX}:${userId}`);
    });
    return { setUserSocket, getUserSocket, deleteUserSocket };
};
exports.OfficeMemberSocketCacheService = OfficeMemberSocketCacheService;


/***/ }),

/***/ 4718:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeMemberSocketService = void 0;
const OfficeMemberOnlineStatus_1 = __webpack_require__(9366);
const OfficeMemberSocketService = (socketNamespace, socket, officeMemberRepository, officeMemberTransformService, officeMemberSocketCacheService) => {
    function onJoinToOfficeRoom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { officeId } = data;
            const userId = socket.user.id;
            const officeMember = yield officeMemberRepository
                .queryBuilder()
                .findByMemberIdAndOfficeId(userId, officeId)
                .build()
                .getOne();
            if (!officeMember)
                throw new Error('Office member not found');
            socket.data.officeMember = {
                id: officeMember.id,
                memberId: officeMember.memberId,
                officeId: officeMember.officeId
            };
            socket.join(`${officeMember.officeId}`);
            emitMemberOnlineToOffice(officeMember.memberId, officeId);
            setMemberInOfficeOnline(officeMember.memberId);
        });
    }
    function onMemberMove(transform) {
        return __awaiter(this, void 0, void 0, function* () {
            socket
                .to(`${socket.data.officeMember.officeId}`)
                .emit('office_member:moved', Object.assign({ memberId: socket.user.id, officeId: socket.data.officeMember.officeId }, transform));
            yield officeMemberTransformService.updateTransformInCacheById(socket.data.officeMember.id, transform);
        });
    }
    function onMemberDisconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, memberId } = socket.data.officeMember;
            socket
                .to(`${socket.data.officeMember.officeId}`)
                .emit('office_member:offline', memberId);
            setMemberInOfficeOffline(id);
            yield officeMemberTransformService.backupTransformFromCacheById(id);
        });
    }
    function disconnectExistSocketHasSameUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const socketWithSameUserId = yield officeMemberSocketCacheService.getUserSocket(`${userId}`);
            if (!socketWithSameUserId)
                return;
            const existSocket = socketNamespace.sockets.sockets.get(socketWithSameUserId);
            existSocket === null || existSocket === void 0 ? void 0 : existSocket.emit('office_member:error', 'Multiple socket connection');
            existSocket === null || existSocket === void 0 ? void 0 : existSocket.disconnect();
            yield officeMemberSocketCacheService.deleteUserSocket(`${userId}`);
        });
    }
    function emitMemberOnlineToOffice(memberId, officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            socket.to(`${officeId}`).emit('office_member:online', memberId);
        });
    }
    function setMemberInOfficeOnline(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield officeMemberRepository.setOfficeMemberOnlineStatusById(memberId, OfficeMemberOnlineStatus_1.OfficeMemberOnlineStatus.ONLINE);
        });
    }
    function setMemberInOfficeOffline(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield officeMemberRepository.setOfficeMemberOnlineStatusById(memberId, OfficeMemberOnlineStatus_1.OfficeMemberOnlineStatus.OFFLINE);
        });
    }
    return { onJoinToOfficeRoom, onMemberDisconnect, onMemberMove };
};
exports.OfficeMemberSocketService = OfficeMemberSocketService;


/***/ }),

/***/ 1548:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeRoleType = void 0;
var OfficeRoleType;
(function (OfficeRoleType) {
    OfficeRoleType["OWNER"] = "OWNER";
    OfficeRoleType["ADMIN"] = "ADMIN";
    OfficeRoleType["MEMBER"] = "MEMBER";
})(OfficeRoleType = exports.OfficeRoleType || (exports.OfficeRoleType = {}));


/***/ }),

/***/ 1500:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeRole = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
let OfficeRole = class OfficeRole extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OfficeRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OfficeRole.prototype, "name", void 0);
OfficeRole = __decorate([
    (0, typeorm_1.Entity)({ name: 'office_role' })
], OfficeRole);
exports.OfficeRole = OfficeRole;


/***/ }),

/***/ 9842:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOfficeRoleRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const officeRole_repository_1 = __webpack_require__(3913);
function createOfficeRoleRepository() {
    return (0, typeorm_1.getCustomRepository)(officeRole_repository_1.OfficeRoleRepository);
}
exports.createOfficeRoleRepository = createOfficeRoleRepository;


/***/ }),

/***/ 3913:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeRoleRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const officeRole_entity_1 = __webpack_require__(1500);
const BaseRepository_1 = __webpack_require__(7325);
let OfficeRoleRepository = class OfficeRoleRepository extends BaseRepository_1.BaseRepository {
    findOfficeRoleByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder('office_role')
                .where('office_role.name = :name', { name })
                .getOne();
        });
    }
};
OfficeRoleRepository = __decorate([
    (0, typeorm_1.EntityRepository)(officeRole_entity_1.OfficeRole)
], OfficeRoleRepository);
exports.OfficeRoleRepository = OfficeRoleRepository;


/***/ }),

/***/ 973:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOfficeDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class CreateOfficeDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], CreateOfficeDto.prototype, "name", void 0);
exports.CreateOfficeDto = CreateOfficeDto;


/***/ }),

/***/ 7299:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOfficeDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class UpdateOfficeDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], UpdateOfficeDto.prototype, "name", void 0);
exports.UpdateOfficeDto = UpdateOfficeDto;


/***/ }),

/***/ 1747:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeRouter = void 0;
const office_api_1 = __webpack_require__(9237);
Object.defineProperty(exports, "OfficeRouter", ({ enumerable: true, get: function () { return office_api_1.OfficeRouter; } }));


/***/ }),

/***/ 9237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeRouter = void 0;
const express_1 = __webpack_require__(6860);
const auth_factory_1 = __webpack_require__(6901);
const office_factory_1 = __webpack_require__(4903);
const OfficeRouter = () => {
    const officeController = (0, office_factory_1.createOfficeController)();
    const { protect } = (0, auth_factory_1.createAuthMiddleware)();
    const router = (0, express_1.Router)();
    router.use(protect);
    router.route('/:id/members').get(officeController.getOfficeMembersById);
    router.route('/:id/items').get(officeController.getOfficeItemsById);
    router
        .route('/:id')
        .get(officeController.getOfficeDetailById)
        .delete(officeController.deleteOfficeById)
        .patch(officeController.updateOfficeById);
    router
        .route('/')
        .get(officeController.getAllOfficesOverviewCurrentUserIsMember)
        .post(officeController.createOffice)
        .patch(officeController.updateOfficeById);
    return router;
};
exports.OfficeRouter = OfficeRouter;


/***/ }),

/***/ 5308:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeController = void 0;
const pageParser_1 = __webpack_require__(1624);
const httpStatusCode_1 = __webpack_require__(7500);
const appError_1 = __webpack_require__(2720);
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const requestValidation_1 = __webpack_require__(5718);
const CreateOffice_dto_1 = __webpack_require__(973);
const UpdateOffice_dto_1 = __webpack_require__(7299);
const OfficeController = (officeService) => {
    const getOfficeDetailById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        const office = yield officeService.findOfficeDetailById(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            office
        });
    }));
    const updateOfficeById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, requestValidation_1.validateRequestBody)(UpdateOffice_dto_1.UpdateOfficeDto, req.body);
        if (errors.length > 0) {
            throw new appError_1.IllegalArgumentError('Invalid update office data', errors);
        }
        const id = +req.params.id;
        const updateOfficeDto = req.body;
        const office = yield officeService.updateOfficeById(id, updateOfficeDto);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            office
        });
    }));
    const deleteOfficeById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        yield officeService.deleteOfficeById(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success'
        });
    }));
    const getOfficeItemsById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        const items = yield officeService.findOfficeItemsById(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            data: items
        });
    }));
    const getOfficeMembersById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = +req.params.id;
        const members = yield officeService.findOfficeMembersById(id);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            data: members
        });
    }));
    const getAllOfficesOverviewCurrentUserIsMember = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const pageable = (0, pageParser_1.pageParser)(req.query, {
            defaultPage: 1,
            defaultSize: 10
        });
        const [offices, total] = yield officeService.findAllOfficesOverviewUserIsMemberByUserId(req.user.id, pageable);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            page: pageable.page,
            limit: pageable.size,
            total,
            offices
        });
    }));
    const createOffice = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, requestValidation_1.validateRequestBody)(CreateOffice_dto_1.CreateOfficeDto, req.body);
        if (errors.length > 0)
            throw new appError_1.IllegalArgumentError('Invalid request body', errors);
        const createOfficeDto = req.body;
        const office = yield officeService.createOffice(req.user.id, createOfficeDto);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            status: 'success',
            office
        });
    }));
    return {
        getOfficeDetailById,
        updateOfficeById,
        deleteOfficeById,
        getOfficeItemsById,
        getOfficeMembersById,
        getAllOfficesOverviewCurrentUserIsMember,
        createOffice
    };
};
exports.OfficeController = OfficeController;


/***/ }),

/***/ 3578:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeCreator = void 0;
const office_mapping_1 = __webpack_require__(9855);
const OfficeCreator = (officeRepository, officeMemberRepository, officeItemRepository) => {
    const createOfficeOverviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const office = yield officeRepository
            .queryBuilder()
            .findById(id)
            .withCreator()
            .build()
            .getOne();
        return (0, office_mapping_1.mapOfficeToOfficeOverviewDto)(office);
    });
    const createOfficeDetailById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const office = yield officeRepository
            .queryBuilder()
            .findById(id)
            .withCreator()
            .build()
            .getOne();
        const members = yield officeMemberRepository
            .queryBuilder()
            .findByOfficeId(id)
            .withMember()
            .withTransform()
            .build()
            .getMany();
        const items = yield officeItemRepository.findOfficeItemsWithItemByOfficeId(id);
        return (0, office_mapping_1.mapOfficeToOfficeDetailDto)({
            office: office,
            officeItems: items,
            officeMembers: members
        });
    });
    const createOfficesOverviewsByIds = (ids) => __awaiter(void 0, void 0, void 0, function* () {
        if (ids.length === 0)
            return [];
        const offices = yield officeRepository
            .queryBuilder()
            .findByIds(ids)
            .withCreator()
            .build()
            .getMany();
        return offices.map(office => (0, office_mapping_1.mapOfficeToOfficeOverviewDto)(office));
    });
    const createOfficesOverview = (pageable) => __awaiter(void 0, void 0, void 0, function* () {
        const offices = yield officeRepository
            .queryBuilder()
            .withCreator()
            .withPageable(pageable)
            .build()
            .getMany();
        return offices.map(office => (0, office_mapping_1.mapOfficeToOfficeOverviewDto)(office));
    });
    return {
        createOfficeOverviewById,
        createOfficesOverviewsByIds,
        createOfficeDetailById,
        createOfficesOverview
    };
};
exports.OfficeCreator = OfficeCreator;


/***/ }),

/***/ 4843:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Office = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
const officeItem_entity_1 = __webpack_require__(2965);
const officeMember_entity_1 = __webpack_require__(5970);
const user_entity_1 = __webpack_require__(4614);
let Office = class Office extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Office.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Office.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, name: 'invitation_code' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Office.prototype, "invitationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Office.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => officeItem_entity_1.OfficeItem, officeItem => officeItem.office, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Office.prototype, "officeItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => officeMember_entity_1.OfficeMember, officeMember => officeMember.office, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Office.prototype, "officeMembers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_user_id' }),
    __metadata("design:type", user_entity_1.User)
], Office.prototype, "createdBy", void 0);
Office = __decorate([
    (0, typeorm_1.Entity)({ name: 'office' })
], Office);
exports.Office = Office;


/***/ }),

/***/ 2100:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeErrorMessages = void 0;
exports.OfficeErrorMessages = {
    OFFICE_NOT_FOUND: 'Office not found'
};


/***/ }),

/***/ 4903:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOfficeRepository = exports.createOfficeCreator = exports.createOfficeValidate = exports.createOfficeGenerator = exports.createOfficeService = exports.createOfficeSocketHandler = exports.createOfficeController = void 0;
const typeorm_1 = __webpack_require__(5250);
const officeItem_factory_1 = __webpack_require__(4509);
const officeMember_factory_1 = __webpack_require__(4491);
const office_controller_1 = __webpack_require__(5308);
const office_creator_1 = __webpack_require__(3578);
const office_repository_1 = __webpack_require__(9772);
const office_service_1 = __webpack_require__(7174);
const office_validate_1 = __webpack_require__(1241);
const officeRole_factory_1 = __webpack_require__(9842);
const officeInvitationCodeGenerator_1 = __importDefault(__webpack_require__(8293));
const office_socketHandler_1 = __webpack_require__(6456);
function createOfficeController() {
    return (0, office_controller_1.OfficeController)(createOfficeService());
}
exports.createOfficeController = createOfficeController;
function createOfficeSocketHandler(io, socket) {
    return (0, office_socketHandler_1.OfficeSocketHandler)(io, socket);
}
exports.createOfficeSocketHandler = createOfficeSocketHandler;
function createOfficeService() {
    const officeRepository = createOfficeRepository();
    const officeItemRepository = (0, officeItem_factory_1.createOfficeItemRepository)();
    const officeMemberRepository = (0, officeMember_factory_1.createOfficeMemberRepository)();
    const officeRoleRepository = (0, officeRole_factory_1.createOfficeRoleRepository)();
    const officeCreator = createOfficeCreator();
    const officeMemberCreator = (0, officeMember_factory_1.createOfficeMemberCreator)();
    const officeValidate = createOfficeValidate();
    const generator = createOfficeGenerator();
    return (0, office_service_1.OfficeService)(officeRepository, officeItemRepository, officeMemberRepository, officeRoleRepository, officeCreator, officeMemberCreator, officeValidate, generator);
}
exports.createOfficeService = createOfficeService;
function createOfficeGenerator() {
    return officeInvitationCodeGenerator_1.default;
}
exports.createOfficeGenerator = createOfficeGenerator;
function createOfficeValidate() {
    const officeRepository = createOfficeRepository();
    return (0, office_validate_1.OfficeValidate)(officeRepository);
}
exports.createOfficeValidate = createOfficeValidate;
function createOfficeCreator() {
    const officeRepository = createOfficeRepository();
    const officeItemRepository = (0, officeItem_factory_1.createOfficeItemRepository)();
    const officeMemberRepository = (0, officeMember_factory_1.createOfficeMemberRepository)();
    return (0, office_creator_1.OfficeCreator)(officeRepository, officeMemberRepository, officeItemRepository);
}
exports.createOfficeCreator = createOfficeCreator;
function createOfficeRepository() {
    return (0, typeorm_1.getCustomRepository)(office_repository_1.OfficeRepository);
}
exports.createOfficeRepository = createOfficeRepository;


/***/ }),

/***/ 9855:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapOfficeToOfficeDetailDto = exports.mapOfficeToOfficeOverviewDto = void 0;
const officeItem_mapping_1 = __webpack_require__(7437);
const officeMember_mapping_1 = __webpack_require__(8164);
const user_mapping_1 = __webpack_require__(9857);
const mapOfficeToOfficeOverviewDto = (office) => {
    const { id, createdAt, invitationCode, name, createdBy } = office;
    return {
        id,
        name,
        invitationCode,
        createdBy: (0, user_mapping_1.mapUserToUserOverviewDto)(createdBy),
        createdAt
    };
};
exports.mapOfficeToOfficeOverviewDto = mapOfficeToOfficeOverviewDto;
const mapOfficeToOfficeDetailDto = (data) => {
    const { office, officeItems, officeMembers } = data;
    const { id, createdAt, invitationCode, name, createdBy } = office;
    const itemsDto = officeItems.map(item => (0, officeItem_mapping_1.mapOfficeItemToOfficeItemOverviewDto)(item));
    const membersDto = officeMembers.map(member => (0, officeMember_mapping_1.mapOfficeMemberToOfficeMemberOverviewDto)(member));
    return {
        id,
        name,
        invitationCode,
        createdBy: (0, user_mapping_1.mapUserToUserOverviewDto)(createdBy),
        officeItems: itemsDto,
        officeMembers: membersDto,
        createdAt
    };
};
exports.mapOfficeToOfficeDetailDto = mapOfficeToOfficeDetailDto;


/***/ }),

/***/ 9772:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseRepository_1 = __webpack_require__(7325);
const office_entity_1 = __webpack_require__(4843);
const office_repositoryBuilder_1 = __webpack_require__(1179);
let OfficeRepository = class OfficeRepository extends BaseRepository_1.BaseRepository {
    queryBuilder() {
        return new office_repositoryBuilder_1.OfficeRepositoryQueryBuilder(this);
    }
    existsOfficeByInvitationCode(invitationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.createQueryBuilder('office')
                .where('office.invitationCode = :invitationCode', {
                invitationCode
            })
                .getCount();
            return count === 1;
        });
    }
    existsOfficeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.createQueryBuilder('office')
                .where('office.id = :id', { id })
                .getCount();
            return count === 1;
        });
    }
};
OfficeRepository = __decorate([
    (0, typeorm_1.EntityRepository)(office_entity_1.Office)
], OfficeRepository);
exports.OfficeRepository = OfficeRepository;


/***/ }),

/***/ 1179:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeRepositoryQueryBuilder = void 0;
const RepositoryQueryBuilder_1 = __webpack_require__(9456);
class OfficeRepositoryQueryBuilder extends RepositoryQueryBuilder_1.RepositoryQueryBuilder {
    constructor(repository) {
        super(repository, 'office');
    }
    findById(id) {
        super.findById(id);
        return this;
    }
    findByIds(ids) {
        this.query.where('office.id IN (:...ids)', { ids });
        return this;
    }
    findByInvitationCode(invitationCode) {
        this.query.where('office.invitation_code = :invitationCode', {
            invitationCode
        });
        return this;
    }
    findByCreatorId(creatorId) {
        this.query.where('office.created_by_user_id = :creatorId', {
            creatorId
        });
        return this;
    }
    withCreator() {
        this.query.leftJoinAndSelect('office.createdBy', 'user');
        return this;
    }
    withPageable(pageable) {
        super.withPageable(pageable);
        return this;
    }
}
exports.OfficeRepositoryQueryBuilder = OfficeRepositoryQueryBuilder;


/***/ }),

/***/ 7174:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeService = void 0;
const officeItem_mapping_1 = __webpack_require__(7437);
const OfficeRoleType_1 = __webpack_require__(1548);
const OfficeService = (officeRepository, officeItemRepository, officeMemberRepository, officeRoleRepository, officeCreator, officeMemberCreator, officeValidate, officeInvitationCodeGenerator) => {
    const createOffice = (createdUserId, createOfficeDto) => __awaiter(void 0, void 0, void 0, function* () {
        const invitationCode = officeInvitationCodeGenerator.generate();
        const ownerRole = yield officeRoleRepository.findOfficeRoleByName(OfficeRoleType_1.OfficeRoleType.OWNER);
        const officeMember = officeMemberRepository.create({
            memberId: createdUserId,
            roles: [{ officeRole: ownerRole }],
            transform: {}
        });
        const office = yield officeRepository.save({
            invitationCode,
            createdByUserId: createdUserId,
            name: createOfficeDto.name,
            officeMembers: [officeMember]
        });
        const officeDto = yield officeCreator.createOfficeOverviewById(office.id);
        return officeDto;
    });
    const updateOfficeById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeValidate.checkOfficeExistsById(id);
        yield officeRepository.save({
            id,
            name: payload.name
        });
        return officeCreator.createOfficeOverviewById(id);
    });
    const findOfficeOverviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeValidate.checkOfficeExistsById(id);
        const officeOverview = yield officeCreator.createOfficeOverviewById(id);
        return officeOverview;
    });
    const findOfficeDetailById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeValidate.checkOfficeExistsById(id);
        const officeDetail = yield officeCreator.createOfficeDetailById(id);
        return officeDetail;
    });
    const findAllOfficesOverview = (pageable) => __awaiter(void 0, void 0, void 0, function* () {
        return yield officeCreator.createOfficesOverview(pageable);
    });
    const findAllOfficesOverviewUserIsMemberByUserId = (userId, pageable) => __awaiter(void 0, void 0, void 0, function* () {
        const officeMembers = yield officeMemberRepository
            .queryBuilder()
            .findByMemberId(userId)
            .withPageable(pageable)
            .build()
            .getMany();
        const totalOfficeMembers = yield officeMemberRepository
            .queryBuilder()
            .findByMemberId(userId)
            .build()
            .getCount();
        const offices = yield officeCreator.createOfficesOverviewsByIds(officeMembers.map(om => om.officeId));
        return [offices, totalOfficeMembers];
    });
    const findOfficeItemsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeValidate.checkOfficeExistsById(id);
        const office = yield officeCreator.createOfficeOverviewById(id);
        const items = yield officeItemRepository.findOfficeItemsWithItemByOfficeId(id);
        return {
            office,
            items: items.map(item => (0, officeItem_mapping_1.mapOfficeItemToOfficeItemOverviewDto)(item))
        };
    });
    const findOfficeMembersById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeValidate.checkOfficeExistsById(id);
        const office = yield officeCreator.createOfficeOverviewById(id);
        const members = yield officeMemberCreator.createOfficeMembersOverviewByOfficeId(id);
        return {
            office,
            members
        };
    });
    const deleteOfficeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield officeValidate.checkOfficeExistsById(id);
        yield officeRepository.softDelete(id);
    });
    return {
        createOffice,
        findOfficeOverviewById,
        findOfficeDetailById,
        findAllOfficesOverview,
        findAllOfficesOverviewUserIsMemberByUserId,
        findOfficeItemsById,
        findOfficeMembersById,
        updateOfficeById,
        deleteOfficeById
    };
};
exports.OfficeService = OfficeService;


/***/ }),

/***/ 6456:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeSocketHandler = void 0;
const officeMember_factory_1 = __webpack_require__(4491);
const officeItem_factory_1 = __webpack_require__(4509);
const OfficeSocketHandler = (socketNamespace, socket) => {
    const officeMemberSocketService = (0, officeMember_factory_1.createOfficeMemberSocketService)(socketNamespace, socket);
    const officeItemSocketService = (0, officeItem_factory_1.createOfficeItemSocketService)(socketNamespace, socket);
    socket.on('office_member:join', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield officeMemberSocketService.onJoinToOfficeRoom(data);
            handleOfficeMemberEvents(socket);
            handleOfficeItemsEvents(socket);
            socket.on('disconnect', () => {
                officeMemberSocketService.onMemberDisconnect();
            });
        }
        catch (err) {
            socket.emit('office:error', err);
        }
    }));
    function handleOfficeMemberEvents(socket) {
        socket.on('office_member:move', (transform) => {
            officeMemberSocketService.onMemberMove(transform);
        });
    }
    function handleOfficeItemsEvents(socket) {
        socket.on('office_item:create', (data) => {
            officeItemSocketService.onOfficeItemCreate(data);
        });
        socket.on('office_item:move', (data) => {
            officeItemSocketService.onOfficeItemMove(data);
        });
        socket.on('office_item:delete', (id) => {
            officeItemSocketService.onOfficeItemDelete(id);
        });
    }
};
exports.OfficeSocketHandler = OfficeSocketHandler;


/***/ }),

/***/ 1241:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficeValidate = void 0;
const appError_1 = __webpack_require__(2720);
const office_error_1 = __webpack_require__(2100);
const OfficeValidate = (officeRepository) => {
    const checkOfficeExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const isExisted = yield officeRepository.existsOfficeById(id);
        if (!isExisted)
            throw new appError_1.NotFoundError(office_error_1.OfficeErrorMessages.OFFICE_NOT_FOUND);
    });
    return { checkOfficeExistsById };
};
exports.OfficeValidate = OfficeValidate;


/***/ }),

/***/ 8547:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordEncoder = void 0;
const config_1 = __importDefault(__webpack_require__(2275));
const bcrypt_1 = __webpack_require__(7096);
const PasswordEncoder = () => {
    const encode = (password) => {
        const encryptedPassword = (0, bcrypt_1.hashSync)(password, config_1.default.auth.BCRYPT_SALT_ROUNDS);
        return encryptedPassword;
    };
    return { encode };
};
exports.PasswordEncoder = PasswordEncoder;


/***/ }),

/***/ 2586:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordResetTokenCreator = void 0;
const PasswordResetTokenCreator = () => {
    const mapPasswordResetTokenToPasswordResetTokenDto = (passwordResetTokenEntity) => {
        const { id, userId, passwordResetToken, passwordResetTokenExpired, createdAt } = passwordResetTokenEntity;
        return {
            id,
            userId,
            passwordResetToken,
            passwordResetTokenExpired,
            createdAt
        };
    };
    return { mapPasswordResetTokenToPasswordResetTokenDto };
};
exports.PasswordResetTokenCreator = PasswordResetTokenCreator;


/***/ }),

/***/ 3134:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordResetToken = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
const user_entity_1 = __webpack_require__(4614);
let PasswordResetToken = class PasswordResetToken extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PasswordResetToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], PasswordResetToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, name: 'password_reset_token' }),
    __metadata("design:type", String)
], PasswordResetToken.prototype, "passwordResetToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_reset_token_expired' }),
    __metadata("design:type", Date)
], PasswordResetToken.prototype, "passwordResetTokenExpired", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PasswordResetToken.prototype, "user", void 0);
PasswordResetToken = __decorate([
    (0, typeorm_1.Entity)({ name: 'password_reset_token' })
], PasswordResetToken);
exports.PasswordResetToken = PasswordResetToken;


/***/ }),

/***/ 2752:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordResetTokenMessages = void 0;
exports.PasswordResetTokenMessages = {
    TOKEN_EXPIRED: 'Password reset token expired',
    TOKEN_INVALID: 'Password reset token invalid'
};


/***/ }),

/***/ 1538:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPasswordResetTokenCreator = exports.createPasswordResetTokenService = exports.createPasswordResetTokenRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const passwordResetToken_creator_1 = __webpack_require__(2586);
const passwordResetToken_repository_1 = __webpack_require__(9070);
const passwordResetToken_service_1 = __webpack_require__(9894);
const createPasswordResetTokenRepository = () => {
    const passwordResetTokenRepository = (0, typeorm_1.getCustomRepository)(passwordResetToken_repository_1.PasswordResetTokenRepository);
    return passwordResetTokenRepository;
};
exports.createPasswordResetTokenRepository = createPasswordResetTokenRepository;
const createPasswordResetTokenService = () => {
    const passwordResetTokenRepository = (0, exports.createPasswordResetTokenRepository)();
    const passwordResetTokenCreator = (0, exports.createPasswordResetTokenCreator)();
    return (0, passwordResetToken_service_1.PasswordResetTokenService)(passwordResetTokenRepository, passwordResetTokenCreator);
};
exports.createPasswordResetTokenService = createPasswordResetTokenService;
const createPasswordResetTokenCreator = () => {
    return (0, passwordResetToken_creator_1.PasswordResetTokenCreator)();
};
exports.createPasswordResetTokenCreator = createPasswordResetTokenCreator;


/***/ }),

/***/ 9070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordResetTokenRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseRepository_1 = __webpack_require__(7325);
const passwordResetToken_entity_1 = __webpack_require__(3134);
let PasswordResetTokenRepository = class PasswordResetTokenRepository extends BaseRepository_1.BaseRepository {
    findByToken(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    passwordResetToken: resetToken
                }
            });
        });
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.softDelete({ userId });
        });
    }
};
PasswordResetTokenRepository = __decorate([
    (0, typeorm_1.EntityRepository)(passwordResetToken_entity_1.PasswordResetToken)
], PasswordResetTokenRepository);
exports.PasswordResetTokenRepository = PasswordResetTokenRepository;


/***/ }),

/***/ 9894:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordResetTokenService = void 0;
const crypto_1 = __importDefault(__webpack_require__(6113));
const config_1 = __importDefault(__webpack_require__(2275));
const appError_1 = __webpack_require__(2720);
const passwordResetToken_error_1 = __webpack_require__(2752);
const PasswordResetTokenService = (passwordResetTokenRepository, passwordResetTokenCreator) => {
    const findByPlainToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const encryptedToken = encryptToken(token);
        const resetToken = yield passwordResetTokenRepository.findByToken(encryptedToken);
        if (!resetToken) {
            throw new appError_1.NotFoundError(passwordResetToken_error_1.PasswordResetTokenMessages.TOKEN_INVALID);
        }
        return passwordResetTokenCreator.mapPasswordResetTokenToPasswordResetTokenDto(resetToken);
    });
    const createToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenPlain = crypto_1.default
            .randomBytes(config_1.default.auth.RESET_PASSWORD_TOKEN_LENGTH)
            .toString('hex');
        const tokenEncrypt = encryptToken(tokenPlain);
        const createdToken = yield passwordResetTokenRepository.save({
            userId,
            passwordResetToken: tokenEncrypt,
            passwordResetTokenExpired: new Date(Date.now() + config_1.default.auth.RESET_PASSWORD_TOKEN_EXPIRES_TIME)
        });
        return passwordResetTokenCreator.mapPasswordResetTokenToPasswordResetTokenDto(Object.assign(Object.assign({}, createdToken), { passwordResetToken: tokenPlain }));
    });
    const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenEncrypt = encryptToken(token);
        const resetToken = yield passwordResetTokenRepository.findByToken(tokenEncrypt);
        if (!resetToken) {
            throw new appError_1.IllegalArgumentError(passwordResetToken_error_1.PasswordResetTokenMessages.TOKEN_INVALID);
        }
        if (resetToken.passwordResetTokenExpired.getTime() < Date.now()) {
            throw new appError_1.IllegalArgumentError(passwordResetToken_error_1.PasswordResetTokenMessages.TOKEN_EXPIRED);
        }
        return true;
    });
    const deleteByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield passwordResetTokenRepository.deleteByUserId(userId);
    });
    function encryptToken(token) {
        return crypto_1.default.createHash('sha256').update(token).digest('hex');
    }
    return {
        findByPlainToken,
        createToken,
        validateToken,
        deleteByUserId
    };
};
exports.PasswordResetTokenService = PasswordResetTokenService;


/***/ }),

/***/ 4574:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenStatus = void 0;
var RefreshTokenStatus;
(function (RefreshTokenStatus) {
    RefreshTokenStatus["ACTIVE"] = "active";
    RefreshTokenStatus["BLOCKED"] = "blocked";
})(RefreshTokenStatus = exports.RefreshTokenStatus || (exports.RefreshTokenStatus = {}));


/***/ }),

/***/ 3669:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshToken = void 0;
const typeorm_1 = __webpack_require__(5250);
const user_entity_1 = __webpack_require__(4614);
const RefreshTokenStatus_1 = __webpack_require__(4574);
const BaseEntity_1 = __webpack_require__(777);
let RefreshToken = class RefreshToken extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RefreshToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], RefreshToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RefreshTokenStatus_1.RefreshTokenStatus,
        default: RefreshTokenStatus_1.RefreshTokenStatus.ACTIVE
    }),
    __metadata("design:type", String)
], RefreshToken.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], RefreshToken.prototype, "user", void 0);
RefreshToken = __decorate([
    (0, typeorm_1.Entity)({ name: 'refresh_token' }),
    (0, typeorm_1.Index)(['token', 'userId'], { unique: true })
], RefreshToken);
exports.RefreshToken = RefreshToken;


/***/ }),

/***/ 1663:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseRepository_1 = __webpack_require__(7325);
const refreshToken_entity_1 = __webpack_require__(3669);
const RefreshTokenStatus_1 = __webpack_require__(4574);
let RefreshTokenRepository = class RefreshTokenRepository extends BaseRepository_1.BaseRepository {
    existsTokenByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.count({
                where: {
                    userId
                }
            });
            return count === 1;
        });
    }
    findByTokenAndUserId(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    userId,
                    token
                }
            });
        });
    }
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    token
                }
            });
        });
    }
    deleteByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.softDelete({
                token
            });
        });
    }
    blockByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({
                token
            }, {
                status: RefreshTokenStatus_1.RefreshTokenStatus.BLOCKED
            });
        });
    }
};
RefreshTokenRepository = __decorate([
    (0, typeorm_1.EntityRepository)(refreshToken_entity_1.RefreshToken)
], RefreshTokenRepository);
exports.RefreshTokenRepository = RefreshTokenRepository;


/***/ }),

/***/ 6237:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserLoginProvider = void 0;
var UserLoginProvider;
(function (UserLoginProvider) {
    UserLoginProvider["GOOGLE"] = "google";
    UserLoginProvider["FACEBOOK"] = "facebook";
    UserLoginProvider["LOCAL"] = "local";
})(UserLoginProvider = exports.UserLoginProvider || (exports.UserLoginProvider = {}));


/***/ }),

/***/ 7927:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRoleType = void 0;
var UserRoleType;
(function (UserRoleType) {
    UserRoleType["ADMIN"] = "admin";
    UserRoleType["USER"] = "user";
})(UserRoleType = exports.UserRoleType || (exports.UserRoleType = {}));


/***/ }),

/***/ 6648:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["BLOCKED"] = "blocked";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));


/***/ }),

/***/ 8927:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "passwordConfirm", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ 4036:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
class UpdateUserDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "avatar", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ 6146:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7581), exports);


/***/ }),

/***/ 7581:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRouter = void 0;
const express_1 = __webpack_require__(6860);
const auth_factory_1 = __webpack_require__(6901);
const UserRoleType_1 = __webpack_require__(7927);
const user_controller_1 = __webpack_require__(24);
const user_factory_1 = __webpack_require__(6586);
const UserRouter = () => {
    const router = (0, express_1.Router)();
    const authMiddleware = (0, auth_factory_1.createAuthMiddleware)();
    const userService = (0, user_factory_1.createUserService)();
    const userController = (0, user_controller_1.UserController)(userService);
    router.use('/', authMiddleware.protect);
    router
        .route('/me/profile')
        .get(userController.getProfile)
        .patch(userController.updateProfile);
    router
        .route('/:id')
        .all(authMiddleware.restrictTo([UserRoleType_1.UserRoleType.ADMIN]))
        .get(userController.getUserById)
        .patch(userController.updateUser)
        .delete(userController.deleteUser);
    router
        .route('/')
        .all(authMiddleware.restrictTo([UserRoleType_1.UserRoleType.ADMIN]))
        .post(userController.createUser)
        .get(userController.getUsers);
    return router;
};
exports.UserRouter = UserRouter;


/***/ }),

/***/ 24:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const httpStatusCode_1 = __webpack_require__(7500);
const appError_1 = __webpack_require__(2720);
const catchAsyncRequestHandler_1 = __webpack_require__(3015);
const requestValidation_1 = __webpack_require__(5718);
const CreateUser_dto_1 = __webpack_require__(8927);
const UpdateUser_dto_1 = __webpack_require__(4036);
const UserController = (userService) => {
    const createUser = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, requestValidation_1.validateRequestBody)(CreateUser_dto_1.CreateUserDto, req.body);
        if (errors.length > 0) {
            throw new appError_1.IllegalArgumentError('Invalid user data', errors);
        }
        const createUserDto = req.body;
        const user = yield userService.createLocalUser(createUserDto);
        res.status(httpStatusCode_1.HttpStatusCode.CREATED).json({
            message: 'User created successfully',
            user
        });
    }));
    const getProfile = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const user = yield userService.findUserById(userId);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json(user);
    }));
    const updateProfile = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        const errors = yield (0, requestValidation_1.validateRequestBody)(UpdateUser_dto_1.UpdateUserDto, req.body);
        if (errors.length > 0)
            throw new appError_1.IllegalArgumentError('Invalid update user data', errors);
        const updateUserDto = req.body;
        const updatedUser = yield userService.updateUserById(userId, updateUserDto);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json(updatedUser);
    }));
    const getUserById = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = +req.params.id;
        const user = yield userService.findUserById(userId);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json(user);
    }));
    const updateUser = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = +req.params.id;
        const errors = yield (0, requestValidation_1.validateRequestBody)(UpdateUser_dto_1.UpdateUserDto, req.body);
        if (errors.length > 0)
            throw new appError_1.IllegalArgumentError('Invalid update user data', errors);
        const updateUserDto = req.body;
        const updatedUser = yield userService.updateUserById(userId, updateUserDto);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json(updatedUser);
    }));
    const deleteUser = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = +req.params.id;
        yield userService.deleteUserById(userId);
        res.status(httpStatusCode_1.HttpStatusCode.OK).json({
            message: 'User deleted successfully'
        });
    }));
    const getUsers = (0, catchAsyncRequestHandler_1.catchAsyncRequestHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
    return {
        createUser,
        getProfile,
        updateProfile,
        getUserById,
        updateUser,
        deleteUser,
        getUsers
    };
};
exports.UserController = UserController;


/***/ }),

/***/ 3066:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCreator = void 0;
const UserCreator = () => {
    const userEntityToUserDto = (model) => {
        return {
            id: model.id,
            name: model.name,
            email: model.email,
            avatar: model.avatar,
            phone: model.phone,
            status: model.status,
            provider: model.provider,
            externalId: model.externalId,
            createdAt: model.createdAt
        };
    };
    return { userEntityToUserDto };
};
exports.UserCreator = UserCreator;


/***/ }),

/***/ 4614:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(5250);
const BaseEntity_1 = __webpack_require__(777);
const UserLoginProvider_1 = __webpack_require__(6237);
const UserRoleType_1 = __webpack_require__(7927);
const UserStatus_1 = __webpack_require__(6648);
let User = class User extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)('email_idx', { unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserLoginProvider_1.UserLoginProvider,
        default: UserLoginProvider_1.UserLoginProvider.LOCAL
    }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'external_id' }),
    __metadata("design:type", String)
], User.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UserRoleType_1.UserRoleType, default: UserRoleType_1.UserRoleType.USER }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UserStatus_1.UserStatus, default: UserStatus_1.UserStatus.INACTIVE }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], User);
exports.User = User;


/***/ }),

/***/ 2148:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserErrorMessage = void 0;
exports.UserErrorMessage = {
    REGISTRATION_MISMATCH_PASSWORD: 'Password and confirm password do not match',
    REGISTRATION_EMAIL_EXISTED: 'Email already exists',
    USER_NOT_FOUND: 'User not found'
};


/***/ }),

/***/ 6586:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createUserValidate = exports.createUserCreator = exports.createUserService = exports.createUserRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const passwordEncoder_1 = __webpack_require__(8547);
const user_creator_1 = __webpack_require__(3066);
const user_repository_1 = __webpack_require__(7122);
const user_service_1 = __webpack_require__(8111);
const user_validate_1 = __webpack_require__(3746);
function createUserRepository() {
    return (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
}
exports.createUserRepository = createUserRepository;
function createUserService() {
    const userRepository = createUserRepository();
    const userValidate = createUserValidate();
    const userCreator = createUserCreator();
    const passwordEncoder = (0, passwordEncoder_1.PasswordEncoder)();
    return (0, user_service_1.UserService)(userRepository, userValidate, userCreator, passwordEncoder);
}
exports.createUserService = createUserService;
function createUserCreator() {
    return (0, user_creator_1.UserCreator)();
}
exports.createUserCreator = createUserCreator;
function createUserValidate() {
    const userRepository = createUserRepository();
    return (0, user_validate_1.UserValidate)(userRepository);
}
exports.createUserValidate = createUserValidate;


/***/ }),

/***/ 9857:
/***/ (function(__unused_webpack_module, exports) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapUserToUserOverviewDto = exports.mapUserToUserDto = void 0;
const mapUserToUserDto = (user) => {
    const { password } = user, userDto = __rest(user, ["password"]);
    return userDto;
};
exports.mapUserToUserDto = mapUserToUserDto;
const mapUserToUserOverviewDto = (user) => {
    const { id, name, avatar } = user;
    return { id, name, avatar };
};
exports.mapUserToUserOverviewDto = mapUserToUserOverviewDto;


/***/ }),

/***/ 7122:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const typeorm_1 = __webpack_require__(5250);
const user_entity_1 = __webpack_require__(4614);
const BaseRepository_1 = __webpack_require__(7325);
let UserRepository = class UserRepository extends BaseRepository_1.BaseRepository {
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    email
                }
            });
        });
    }
    findUserByExternalId(externalId, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    externalId,
                    provider
                }
            });
        });
    }
    existsUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.count({
                where: {
                    id
                }
            });
            return count === 1;
        });
    }
    existsUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.count({
                where: {
                    email
                }
            });
            return count === 1;
        });
    }
    updatePasswordByUserId(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ id: userId }, {
                password
            });
        });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;


/***/ }),

/***/ 8111:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const config_1 = __importDefault(__webpack_require__(2275));
const bcrypt_1 = __webpack_require__(7096);
const UserStatus_1 = __webpack_require__(6648);
const UserService = (userRepository, userValidate, userCreator, passwordEncoder) => {
    const createLocalUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        yield userValidate.checkCreateUserData(payload);
        const encryptedPassword = (0, bcrypt_1.hashSync)(payload.password, config_1.default.auth.BCRYPT_SALT_ROUNDS);
        const userCreated = yield userRepository.save(Object.assign(Object.assign({}, payload), { password: encryptedPassword }));
        return userCreator.userEntityToUserDto(userCreated);
    });
    const findOrCreateUserByExternal = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.findUserByExternalId(payload.externalId, payload.provider);
        if (user)
            return userCreator.userEntityToUserDto(user);
        const userCreated = yield userRepository.save(Object.assign({}, payload));
        return userCreator.userEntityToUserDto(userCreated);
    });
    const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield userValidate.checkUserExistsById(id);
        const user = yield userRepository.findById(id);
        return userCreator.userEntityToUserDto(user);
    });
    const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        yield userValidate.checkUserExistsByEmail(email);
        const user = yield userRepository.findUserByEmail(email);
        return userCreator.userEntityToUserDto(user);
    });
    const updateUserById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
        yield userValidate.checkUserExistsById(id);
        const user = yield userRepository.findById(id);
        const updatedUser = yield userRepository.save(Object.assign(Object.assign({}, user), payload));
        return userCreator.userEntityToUserDto(updatedUser);
    });
    const updatePasswordById = (id, updatePasswordDto) => __awaiter(void 0, void 0, void 0, function* () {
        yield userValidate.checkUpdatePasswordData(id, updatePasswordDto);
        const user = yield userRepository.findById(id);
        const hashPassword = passwordEncoder.encode(updatePasswordDto.password);
        const updatedUser = yield userRepository.save(Object.assign(Object.assign({}, user), { password: hashPassword }));
        return userCreator.userEntityToUserDto(updatedUser);
    });
    const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield userValidate.checkUserExistsById(id);
        yield userRepository.softDelete(id);
    });
    const blockUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userRepository.update(id, {
            status: UserStatus_1.UserStatus.BLOCKED
        });
        return result.affected || 0;
    });
    const activeNewUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield userRepository.save({
            id,
            status: UserStatus_1.UserStatus.ACTIVE
        });
        return updatedUser;
    });
    return {
        createLocalUser,
        findOrCreateUserByExternal,
        findUserById,
        findUserByEmail,
        updateUserById,
        updatePasswordById,
        deleteUserById,
        blockUserById,
        activeNewUser
    };
};
exports.UserService = UserService;


/***/ }),

/***/ 3746:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserValidate = void 0;
const appError_1 = __webpack_require__(2720);
const user_error_1 = __webpack_require__(2148);
const UserValidate = (userRepository) => {
    const checkCreateUserData = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, passwordConfirm } = data;
        yield checkPasswordMatch(password, passwordConfirm);
        yield checkUniqueEmail(email);
    });
    const checkUpdatePasswordData = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
        const { password, confirmPassword } = data;
        yield checkUserExistsById(userId);
        yield checkPasswordMatch(password, confirmPassword);
    });
    const checkUserExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const isIdExists = yield userRepository.existsUserById(id);
        if (!isIdExists) {
            throw new appError_1.IllegalArgumentError(user_error_1.UserErrorMessage.USER_NOT_FOUND);
        }
    });
    const checkUserExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const isEmailExists = yield userRepository.existsUserByEmail(email);
        if (!isEmailExists) {
            throw new appError_1.IllegalArgumentError(user_error_1.UserErrorMessage.USER_NOT_FOUND);
        }
    });
    const checkUniqueEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const isEmailExists = yield userRepository.existsUserByEmail(email);
        if (isEmailExists) {
            throw new appError_1.IllegalArgumentError(user_error_1.UserErrorMessage.REGISTRATION_EMAIL_EXISTED);
        }
    });
    const checkPasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            throw new appError_1.IllegalArgumentError(user_error_1.UserErrorMessage.REGISTRATION_MISMATCH_PASSWORD);
        }
    };
    return {
        checkCreateUserData,
        checkUpdatePasswordData,
        checkUserExistsById,
        checkUserExistsByEmail
    };
};
exports.UserValidate = UserValidate;


/***/ }),

/***/ 206:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appConfig = void 0;
const dotenv_1 = __importDefault(__webpack_require__(5142));
dotenv_1.default.config({ path: '.env' });
exports.appConfig = {
    NODE_ENV: "production" || 0,
    PORT: process.env.PORT || 8000,
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN
};


/***/ }),

/***/ 747:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authConfig = void 0;
const dotenv_1 = __importDefault(__webpack_require__(5142));
dotenv_1.default.config({ path: '.env' });
exports.authConfig = {
    JWT_ISSUER: 'virtualspace.com',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_TIME: +process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME,
    REFRESH_TOKEN_EXPIRES_TIME: +process.env.REFRESH_TOKEN_EXPIRES_TIME,
    REFRESH_TOKEN_LENGTH: +process.env.REFRESH_TOKEN_LENGTH,
    BCRYPT_SALT_ROUNDS: 12,
    ACTIVE_USER_TOKEN_LENGTH: +process.env.ACTIVE_USER_TOKEN_LENGTH,
    RESET_PASSWORD_TOKEN_LENGTH: +process.env.RESET_PASSWORD_TOKEN_LENGTH,
    RESET_PASSWORD_TOKEN_EXPIRES_TIME: +process.env.RESET_PASSWORD_TOKEN_EXPIRES_TIME,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    BASE_FRONTEND_URL: process.env.BASE_FRONTEND_URL
};


/***/ }),

/***/ 7054:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloudConfig = void 0;
const dotenv_1 = __importDefault(__webpack_require__(5142));
dotenv_1.default.config({ path: '.env' });
exports.cloudConfig = {
    IMAGE_CLOUDINARY_CLOUD_NAME: process.env.IMAGE_CLOUDINARY_CLOUD_NAME,
    IMAGE_CLOUDINARY_API_KEY: process.env.IMAGE_CLOUDINARY_API_KEY,
    IMAGE_CLOUDINARY_API_SECRET: process.env.IMAGE_CLOUDINARY_API_SECRET,
    MODEL_AWS_BUCKET_REGION: process.env.MODEL_AWS_BUCKET_REGION,
    MODEL_AWS_BUCKET_NAME: process.env.MODEL_AWS_BUCKET_NAME,
    MODEL_AWS_BUCKET_ACCESS_KEY: process.env.MODEL_AWS_BUCKET_ACCESS_KEY,
    MODEL_AWS_BUCKET_SECRET_KEY: process.env.MODEL_AWS_BUCKET_SECRET_KEY
};


/***/ }),

/***/ 6898:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongo_1 = __importDefault(__webpack_require__(1721));
const postgres_1 = __importDefault(__webpack_require__(2797));
exports["default"] = { mongo: mongo_1.default, pg: postgres_1.default };


/***/ }),

/***/ 1721:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __importDefault(__webpack_require__(5142));
dotenv_1.default.config({ path: '.env' });
const databaseConfig = {
    DB_HOST: process.env.DB_MONGO_HOST,
    DB_USERNAME: process.env.DB_MONGO_USERNAME,
    DB_PASSWORD: process.env.DB_MONGO_PASSWORD,
    DB_NAME: process.env.DB_MONGO_NAME,
    DB_PORT: process.env.DB_MONGO_PORT ? +process.env.DB_MONGO_PORT : 5432
};
exports["default"] = databaseConfig;


/***/ }),

/***/ 2797:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __importDefault(__webpack_require__(5142));
dotenv_1.default.config({ path: '.env' });
const databaseConfig = {
    DB_HOST: process.env.DB_POSTGRES_HOST,
    DB_USERNAME: process.env.DB_POSTGRES_USERNAME,
    DB_PASSWORD: process.env.DB_POSTGRES_PASSWORD,
    DB_NAME: process.env.DB_POSTGRES_NAME,
    DB_PORT: process.env.DB_POSTGRES_PORT ? +process.env.DB_POSTGRES_PORT : 5432
};
exports["default"] = databaseConfig;


/***/ }),

/***/ 8853:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.emailConfig = void 0;
const dotenv_1 = __importDefault(__webpack_require__(5142));
dotenv_1.default.config({ path: '.env' });
exports.emailConfig = {
    EMAIL_SERVICE_NAME: process.env.EMAIL_SERVICE_NAME,
    EMAIL_SERVICE_HOST: process.env.EMAIL_SERVICE_HOST,
    EMAIL_SERVICE_PORT: +process.env.EMAIL_SERVICE_PORT,
    EMAIL_SERVICE_USERNAME: process.env.EMAIL_SERVICE_USERNAME,
    EMAIL_SERVICE_PASSWORD: process.env.EMAIL_SERVICE_PASSWORD
};


/***/ }),

/***/ 2275:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const database_1 = __importDefault(__webpack_require__(6898));
const app_1 = __webpack_require__(206);
const auth_1 = __webpack_require__(747);
const email_1 = __webpack_require__(8853);
const cloud_1 = __webpack_require__(7054);
const config = {
    app: app_1.appConfig,
    db: database_1.default,
    auth: auth_1.authConfig,
    mail: email_1.emailConfig,
    cloud: cloud_1.cloudConfig
};
exports["default"] = config;


/***/ }),

/***/ 6775:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderConstants = void 0;
exports.HeaderConstants = {
    TOTAL_COUNT: 'x-total-count',
    PAGE_NUMBER: 'x-page-number',
    PAGE_SIZE: 'x-page-size',
    REFRESH_TOKEN: 'x-refresh-token',
    ACCESS_TOKEN: 'Authorization',
    X_FORWARDED_FOR: 'x-forwarded-for'
};


/***/ }),

/***/ 7500:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpStatusCode = void 0;
class HttpStatusCode {
}
exports.HttpStatusCode = HttpStatusCode;
HttpStatusCode.OK = 200;
HttpStatusCode.CREATED = 201;
HttpStatusCode.BAD_REQUEST = 400;
HttpStatusCode.INTERNAL_SERVER_ERROR = 500;
HttpStatusCode.UNAUTHORIZED = 401;
HttpStatusCode.FORBIDDEN = 403;
HttpStatusCode.NOT_FOUND = 404;
HttpStatusCode.TOO_MANY_REQUESTS = 429;


/***/ }),

/***/ 7728:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(3236);
const http_1 = __importDefault(__webpack_require__(3685));
const express_1 = __importDefault(__webpack_require__(6860));
const app_1 = __webpack_require__(206);
const logger_1 = __webpack_require__(7767);
const app_2 = __webpack_require__(4925);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    try {
        yield (0, app_2.mainAppLoaders)(app, logger_1.serverLogger);
        (0, app_2.socketServerLoader)(server, logger_1.serverLogger);
        (0, app_2.httpServerLoader)(server, app_1.appConfig.PORT, logger_1.serverLogger);
    }
    catch (err) {
        logger_1.serverLogger.error(err);
    }
});
startServer();


/***/ }),

/***/ 2720:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TooManyRequestError = exports.UnauthorizedError = exports.IllegalArgumentError = exports.NotFoundError = exports.AppError = void 0;
const httpStatusCode_1 = __webpack_require__(7500);
class AppError extends Error {
    constructor(statusCode, message, errors) {
        super();
        this.isOperational = true;
        this.status = 'error';
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors || [];
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message) {
        super(httpStatusCode_1.HttpStatusCode.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
class IllegalArgumentError extends AppError {
    constructor(message, errors) {
        super(httpStatusCode_1.HttpStatusCode.BAD_REQUEST, message, errors);
    }
}
exports.IllegalArgumentError = IllegalArgumentError;
class UnauthorizedError extends AppError {
    constructor(message) {
        super(httpStatusCode_1.HttpStatusCode.UNAUTHORIZED, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class TooManyRequestError extends AppError {
    constructor(message) {
        super(httpStatusCode_1.HttpStatusCode.TOO_MANY_REQUESTS, message);
    }
}
exports.TooManyRequestError = TooManyRequestError;


/***/ }),

/***/ 3015:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.catchAsyncRequestHandler = void 0;
const catchAsyncRequestHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    };
};
exports.catchAsyncRequestHandler = catchAsyncRequestHandler;


/***/ }),

/***/ 5021:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.catchAsyncSocketMiddleware = void 0;
const catchAsyncSocketMiddleware = (fn) => {
    return (socket, next) => {
        fn(socket, next).catch(err => next(err));
    };
};
exports.catchAsyncSocketMiddleware = catchAsyncSocketMiddleware;


/***/ }),

/***/ 1624:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pageParser = void 0;
const pageParser = (query, opts) => {
    const { defaultPage = 1, defaultSize = 10 } = opts;
    const { page, size } = query;
    return {
        page: page || defaultPage,
        size: size || defaultSize
    };
};
exports.pageParser = pageParser;


/***/ }),

/***/ 5718:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateRequestBody = void 0;
const class_transformer_1 = __webpack_require__(136);
const class_validator_1 = __webpack_require__(5849);
const validateRequestBody = (classToConvert, body) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, class_transformer_1.plainToInstance)(classToConvert, body);
    const errors = yield (0, class_validator_1.validate)(data, { skipMissingProperties: true });
    const bodyErrors = [];
    errors.forEach(err => {
        const { property, constraints } = err;
        if (constraints) {
            const firstKey = Object.keys(constraints)[0];
            bodyErrors.push({ [property]: constraints[firstKey] });
        }
    });
    return bodyErrors;
});
exports.validateRequestBody = validateRequestBody;


/***/ }),

/***/ 9336:
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ 7096:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 7068:
/***/ ((module) => {

module.exports = require("bull");

/***/ }),

/***/ 136:
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ 5849:
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ 3518:
/***/ ((module) => {

module.exports = require("cloudinary");

/***/ }),

/***/ 3582:
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 6860:
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ 2097:
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ 7806:
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 9470:
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ 1738:
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ 754:
/***/ ((module) => {

module.exports = require("nanoid");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ 3511:
/***/ ((module) => {

module.exports = require("passport");

/***/ }),

/***/ 3210:
/***/ ((module) => {

module.exports = require("passport-facebook");

/***/ }),

/***/ 8117:
/***/ ((module) => {

module.exports = require("passport-google-oauth2");

/***/ }),

/***/ 9103:
/***/ ((module) => {

module.exports = require("query-string");

/***/ }),

/***/ 7558:
/***/ ((module) => {

module.exports = require("redis");

/***/ }),

/***/ 3236:
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ 3952:
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ 4708:
/***/ ((module) => {

module.exports = require("streamifier");

/***/ }),

/***/ 5250:
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ 5828:
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ 7773:
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(7728);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;