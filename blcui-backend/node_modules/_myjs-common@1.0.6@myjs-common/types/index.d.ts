// Type definitions for myjs-common
// Project: https://github.com/AnswerAIL/myjs-common#readme
// Definitions by: L.Answer <https://github.com/AnswerAIL>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "myjs-common" {
    /*~ If this module is a UMD module that exposes a global variable 'myLib' when
    *~ loaded outside a module loader environment, declare that global here.
    *~ Otherwise, delete this declaration.
    *~ export as namespace myLib;
    */


    /*~ If this module has methods, declare them as functions like so.
    */
    // export function myMethod(a: string): string;
    // export function myOtherMethod(a: number): number;

    /*~ You can declare types that are available via importing the module */
    // export interface someType {
    //     name: string;
    //     length: number;
    //     extras?: string[];
    // }

    /**
     *~ MYJS_COMMON 库作者
     */
    export const MYJS_COMMON_AUTHOUR: string;
    /**
     *~ MYJS_COMMON 库发布日期
    */
    export const MYJS_COMMON_PUBLISH_DATE: string;


    /**
     *~ 分隔符
     */
    export namespace SEPARATOR {
        /** 逗号-`,` */
        const COMMA: string;
        /** 分号-`;` */
        const COLON: string;
        /** 斜杆-`/` */
        const SLASH: string;
    }

    /**
     *~ 计算机存储计量单位
     */
    export namespace STORAGE_UNIT {
        /** 1 字节数 */
        const B:    number;
        /** 1K字节数 */
        const KB:   number;
        /** 1MB 字节数 */
        const MB:   number;
        /** 1GB 字节数 */
        const GB:   number;
        /**1TB 字节数 */
        const TB:   number;
        /** 1PB字节数 */
        const PB:   number;
    }

    /**
     *~ 日期时间格式器
    */
    export namespace DATE_FORMATTER {
        /** 年格式化-yyyy */
        const YEAR_FORMAT:      string;
        /** 月格式化-yyyy-MM */
        const MONTH_FORMAT:     string;
        /** 日期格式化-yyyy-MM-dd */
        const DATE_FORMAT:      string;
        /** 时格式化-yyyy-MM-dd HH */
        const HOUR_FORMAT:      string;
        /** 分格式化-yyyy-MM-dd HH:mm */
        const MINUTE_FORMAT:    string;
        /** 秒格式化-yyyy-MM-dd HH:mm:ss */
        const SECONDS_FORMAT:   string;
        /** 时间格式化-yyyy-MM-dd HH:mm:ss.S */
        const DATETIME_FORMAT:  string
    }

    /**
     *~ 日期类型枚举
    */
   export namespace DATE_ENUM {
        /** 31104000000 = 1000 * 60 * 60 * 24 * 30 * 12 */
        const YEAR: 			number;
        /** 2592000000 = 1000 * 60 * 60 * 24 * 30 */
        const MONTH: 			number;
        /** 86400000 = 1000 * 60 * 60 * 24 */
        const DAY: 			    number;
        /** 3600000 = 1000 * 60 * 60 */
        const HOUR: 			number;
        /** 60000 = 1000 * 60 */
        const MINUTE: 		    number;
        /** 1000 = 1000 */
        const SECONDS: 		    number;
        /** 1 = 1 */
        const MILLISECONDS: 	number
    }


    /**
     *~ 日期属性类型 
    */
   export namespace DATE_PROP_TYPE {
        /** YEAR */
        const YEAR: 			string;
        /** MONTH */
        const MONTH: 			string;
        /** DAY */
        const DAY: 			    string;
        /** HOUR */
        const HOUR: 			string;
        /** MINUTE */
        const MINUTE: 		    string;
        /** SECONDS */
        const SECONDS: 		    string;
        /** MILLISECONDS */
        const MILLISECONDS: 	string
   }


   /** 文件上传请求响应码 */
   export namespace RESPONSE_CODE {
        /** 成功 */
        const SUCCESS: string;
        /** 失败 */
        const FAILED: string;
        /** 非法参数 */
        const INVALID_PARAM: string;
    }


    /**
     *~ 日期格式化
    */
    export namespace SimpleDateFormat {
        /**
         * 对当前日期进行格式化 
         * 
         * @param format [string] 日期格式(yyyy-MM-dd HH:mm:ss.S)
         * @return [string] 格式化结果
        */
        function formatNow(format:string): string;

        /**
         * 对指定日期进行格式化 
         * 
         * @param date [Date] 日期
         * @param format [string] -[DATE_FORMATTER.XXX] 日期格式(yyyy-MM-dd HH:mm:ss.S)
         * @return [string] 格式化结果
        */
        function formatDate(date:Date, format:string): string;
    }


    /**
     *~ 字符串格式化
    */
    class StringUtils {

        /**
         *~ 构造器
        */
        private constructor();

        /**
         * 字符串格式化
         * 
         * @param text [string] 待格式化字符串, 占位符为`{}`
         * @param args (string|number)[] 数组参数
         * @template `let arr = ["Answer", 12, "FuJian"];StringUtils.format("my name is: {}, age: {}, address: {}", arr);`
         * @returns string
         * @static
        */
        static format(text:string, args:(string|number)[]): string;

        /**
         * 字符串`str`是否以 `prefix` 开头
         * 
         * @param str [string] 字符串
         * @param prefix [string] 
         * @returns boolean
         * @static
        */
        static startWith(str:string, prefix: string): boolean;

        /**
         * 字符串`str`是否以 `suffix` 结尾
         * 
         * @param str [string] 字符串
         * @param suffix [string] 
         * @returns boolean
         * @static
        */
        static endWith(str:string, suffix: string): boolean;

        /**
         * 返回字符串`str`指定后`count`个字符
         * 
         * @param str [string] 字符串
         * @param count [number] 可选, 默认为 1
         * @returns string
         * @static
        */
        static lastEndChar(str: string, count?: number): string;
    }


    /**
     *~ 运行时异常
    */
    class RuntimeException extends Error {
        /**
         *~ 构造器
         
         @param _code [number]
         @param _desc [string]
        */
       public constructor(code: number, desc: string);
    }


    /**
     *~ MyMap 容器 
    * @deprecated #Map 不建议使用, 建议使用 ES5及之后版本的 Map 容器
    * @description 1.0.0 版本 HashMap 容器已废弃
    */
    class MyMap {
        
        /**
         * 获取 _size 字段
         * 
         * @returns size
        */
        public readonly _size: number;
        /**
         * 获取 _table 字段
         * 
         * @returns table
        */
        public readonly _table: {};

        /**
         *~ 构造器
        */
        public constructor();

        /**
         * 往 hashmap 容器中新增一个, 如果已经存在则覆盖
         * 
         * @param key
         * @param value 
        */
        public put(key:string | number, value:any): void;

        /**
         * 当容器中不存在 key时往 hashmap 容器中新增一个
         * 
         * @param key
         * @param value 
        */
        public putIfAbsent(key:string | number, value:any): void;

        /**
         * 获取 key 对应的 value
         * 
         * @param key
         * @returns value | null
        */
        public get(key:string | number):any;

        /**
         * 获取 hashmap 容器的大小
         * 
         * @returns size
        */
        public size():number;

        /**
         * 移除容器中的 key
         * 
         * @param key
         * @returns value | null
        */
        public remove(key: number | string):(null | string);

        /**
         * 判断容器是否为空
         * 
         * @returns true | false
        */
        public isEmpty():boolean;

        /**
         * 清除容器信息
        */
        public clear():void;

        /**
         * 判断容器中是否存在 key
         * 
         * @param key
         * @returns true | false
        */
        public containsKey(key: string |number):boolean;

        /**
         * 判断容器中是否存在 value
         * 
         * @param value
         * @returns true | false
        */
        public containsValue(value:any):boolean;

        /**
         * 获取容器中的 key 列表
         * 
         * @returns keys [array]
        */
        public keySet():(string | number)[];
        
        /**
         * 转字符串
         *
         * @returns string 
        */
        public toString():string;
    }




    /**
     *~ 日期工具类 
     *
     * @author AnswerALL<answer_ljm@163.com>
     * @description Created At 2019-9-20 10:54:48
     */
    class DateUtils {

        /**
         *~ 构造器
        */
        private constructor();

        /**
         * 获取指定日期`date`前后`years`年
         * 
         * @param date [Date]
         * @param years [int]
         * @returns rlt date [Date] | [null]-参数类型错误 | [undefined]-日期格式错误
        */
        public static addYears(date: Date, years: number): Date | null | undefined;

        /**
         * 获取指定日期`date`前后`months`月
         * 
         * @param date [Date]
         * @param months [int]
         * @returns rlt date [Date] | [null]-参数类型错误 | [undefined]-日期格式错误
        */
        public static addMonths(date: Date, years: number): Date | null | undefined;

        /**
         * 获取指定日期`date`前后`days`天
         * 
         * @param date [Date]
         * @param days [int]
         * @returns rlt date [Date] | [null]-参数类型错误 | [undefined]-日期格式错误
        */
        public static addDays(date: Date, years: number): Date | null | undefined;

        /**
         * 获取指定日期`date`前后`hours`时
         * 
         * @param date [Date]
         * @param hours [int]
         * @returns rlt date [Date] | [null]-参数类型错误 | [undefined]-日期格式错误
        */
        public static addHours(date: Date, years: number): Date | null | undefined;

        /**
         * 获取指定日期`date`前后`minutes`分
         * 
         * @param date [Date]
         * @param minutes [int]
         * @returns rlt date [Date] | [null]-参数类型错误 | [undefined]-日期格式错误
        */
        public static addMinutes(date: Date, years: number): Date | null | undefined;

        /**
         * 获取指定日期`date`前后`seconds`秒
         * 
         * @param date [Date]
         * @param seconds [int]
         * @returns rlt date [Date] | [null]-参数类型错误 | [undefined]-日期格式错误
        */
        public static addSeconds(date: Date, years: number): Date | null | undefined;

        /**
         * 获取指定日期`date`前后`milliseconds`毫秒
         * 
         * @param date [Date]
         * @param milliseconds [int]
         * @returns rlt date [Date] | [null]-参数类型错误 | [undefined]-日期格式错误
        */
        public static addMilliseconds(date: Date, years: number): Date | null | undefined;

        /**
         * 判断指定日期`date1`是否在`date2`之前
         * 
         * @param date1 [Date]
         * @param date2 [Date]
         * @returns [boolean] | [undefined]-日期格式错误
        */
        public static before(date1: Date, date2: Date): boolean | undefined;

       /**
         * 判断指定日期`date1`是否在`date2`之后
         * 
         * @param date1 [Date]
         * @param date2 [Date]
         * @returns [boolean] | [undefined]-日期格式错误
        */
        public static after(date1: Date, date2: Date): boolean | undefined;

        /**
         * 获取两个日期`date1 和 date2`的时间差值, 默认天数`DATE_ENUM.DAY`
         * 
         * @param date1 [Date]
         * @param date2 [Date]
         * @param type [number] - [DATE_ENUM.XXX]
         * @returns diff value[int] | [undefined]-日期格式异常 | [null]-计算异常
        */
        public static diff(date1: Date, date2: Date, type?: number): number | undefined | null;
    }

    /**
     *~ 上传文件请求工具类 
     *
     * @author AnswerALL<answer_ljm@163.com>
     * @description Created At 2019-10-23 19:31:17
     */
    class FuRequire {

        /**
         *~ 构造器
        */
        private constructor();

        /**
         * 上传文件(http)
         * 
         * @param files []
         * @param options OptionArgs `key=[method & host & port & path & file?]`
         * @param callback [Function] (code, data)
         * @param params 请求参数(可选)
         * @returns void
        */
        public static http(files: (string)[], options: OptionArgs, callback: (code: string, data: any) => void, params?: {}): void;

        /**
         * 上传文件(https)
         * 
         * @param files []
         * @param options OptionArgs `key=[method & host & port & path & file?]`
         * @param callback [Function] (code, data)
         * @param params 请求参数(可选)
         * @returns void
        */
       public static https(files: (string)[], options: OptionArgs, callback: (code: string, data: any) => void, params?: {}): void;
    }

    interface OptionArgs {
        host: string;
        port: number | string;
        method: string;
        path: string;
        file?: string;
    }



    /**
     * MyDate 数据类型
     * 
     * @author AnswerALL<answer_ljm@163.com>
     * @description Created At 2019-9-20 14:52:50
    */
    class MyDate extends Date {
        /**
         *~ 构造器
        */
        public constructor(date?: Date | string);

        /**
         * 获取当前日期时间前后`amount` 年/月/日(默认)/时/分/秒/毫秒
         * 
         * @param amount [int]
         * @param prop [string] -[DATE_PROP_TYPE.XXX]
         * @returns date [MyDate] | [null]-prop参数值匹配不到时
        */
        public add(amount: number, prop?: string): MyDate | null;

        /**
         * 获取当前日期和`date`的时间差值, 默认天数`DATE_ENUM.DAY`
         * 
         * @param date [Date]
         * @param prop [number] -[DATE_ENUM.XXX]
         * @returns diff value[int] | [undefined]-日期格式错误 | [null]-计算错误
        */
        public diff(date: Date, prop?: number): number | undefined | null;

        /**
         * 判断当前日期是否在指定日期`date`之前
         * 
         * @param date [Date]
         * @returns rlt [boolean] | [undefined]-日期格式错误
        */
        public prev(date: Date): boolean | undefined;

        /**
         * 判断当前日期是否在指定日期`date`之后
         * 
         * @param date [Date]
         * @returns rlt [boolean] | [undefined]-日期格式错误
        */
        public after(date: Date): boolean | undefined;

        /**
         * 日期格式化
         * 
         * @param pattern [string] -[DATE_FORMATTER.XXX]
         * @returns [string]
         */
        public format(pattern: string): string;
    }


    /**
     * MyString 数据类型
     * 
     * @author AnswerALL<answer_ljm@163.com>
     * @description Created At 2019-9-22 19:57:18
    */
   class MyString extends String {
       /**
        * 对象值
       */
       public readonly _string: string;
        /**
         * 构造函数
        */
       public constructor(str: string);


        /**
         * 字符串个数不足`length`时左补`padStr`
         * @param padStr [string]
         * @param length [int]
         * @returns rlt [string]
        */
       public lpad(padStr: string, length: number): string;


        /**
         * 字符串个数不足`length`时右补`padStr`
         * @param padStr [string]
         * @param length [int]
         * @returns rlt [string]
        */
       public rpad(padStr: string, length: number): string;

        /**
         * 格式化字符串, 对字符串内的所有{}格式化为`args`
         * 
         * @param args (string)[]
         * @returns rlt [string]
        */
       public format(args: (string | number)[]): string;

        /**
         * 对象值是否包含`searchString`
         * 
         * @param searchString [string]
         * @returns boolean
        */
       public contains(searchString: string): boolean;

        /**
         * 把对象值中的 `substr` 全部替换为 `replacement`
         * 
         * @param substr [string]
         * @param replacement [string]
         * @returns rlt [string]
        */
       public replaceAll(substr :string, replacement: string): string;

        /**
         * 对象值是否以`searchString`开头
         * 
         * @param searchString [string]
         * @returns boolean
        */
       public startWith(searchString: string): boolean;

        /**
         * 对象值是否以`searchString`结尾
         * 
         * @param searchString [string]
         * @returns boolean
        */
       public endWith(searchString: string): boolean;

        /**
         * 往对象值后追加`str`
         * 
         * @param str [string]
         * @returns new MyString
        */
       public append(str: string): MyString;

        /**
         * 往对象值前追加`str`
         * 
         * @param str [string]
         * @returns new MyString
        */
       public preppend(str: string): MyString;
   }
}