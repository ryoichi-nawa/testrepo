'use strict'

export const Util = {
    /**
     * 日付としての妥当性
     * @param {String} day 
     * @returns {Boolean} 妥当性の結果
     */
    isValidDay(day) {
        var arr = day.split("/");
        if (arr.length != 3) {
            return false;
        }
        var date = new Date(arr[0], arr[1] - 1, arr[2]);
        if (arr[0] == date.getFullYear() &&
            arr[1] == ('0' + (date.getMonth() + 1)).slice(-2) &&
            arr[2] == ('0' + date.getDate()).slice(-2)) {
            return true;
        }
        else {
            return false;
        }
    },
    /**
     * Date型へ変換
     * @param {String} day 
     * @returns {Date} 変換後の日付
     */
    convertDate(day) {
        var arr = day.split("/");
        return new Date(arr[0], arr[1] - 1, arr[2]);
    }
}
