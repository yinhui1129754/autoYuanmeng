import os
from tool import *


def open_ymzx():
    """打开元梦"""
    os.system("open -a '元梦之星-云游戏-快捷方式'")
    print_log("打开元梦之星")
    # print_nol("打开元梦之星")
    # test_window.print_log("打开元梦之星")
    sleep(1)


def open_browser():
    """打开抖音"""
    


def find_drone():
    """寻找无人机"""
    # 重置位置后，按下a键一秒钟
    pyautogui.press("r")
    print_log("寻找无人机")
    # print_nol("寻找无人机")
    pyautogui.keyDown("a")
    sleep(1)
    pyautogui.keyUp("a")


def farm_work():
    """无人机前往农场"""
    find_drone()
    print_log("无人机前往农场工作")
    pyautogui.press("n")

def pasture_work():
    """无人机前往牧场"""
    find_drone()
    print_log("无人机前往牧场工作")
    pyautogui.press("m")



def start():
    # mac用户
    open_ymzx()
    # windows用户
    # print_log("请在5秒内打开元梦之星")
    # sleep(5)
    while True:
        timestamp_start = datetime.datetime.now()
        # 无人机前往农场工作
        farm_work()
        print_log("农场执行完成，休息四十秒")
        rest(40)
        # 收获鱼塘
        # fishpond()
        # 识别农场
        # identify_farm()
        # 无人机前往牧场工作
        pasture_work()
        print_log("牧场执行完成，休息25秒")
        rest(25)
        # 计算耗时
        timestamp_end = datetime.datetime.now()
        computation_time = timestamp_end - timestamp_start
        t = 120 - computation_time.total_seconds()
        print_log(
            "本次任务耗时：{}秒，休息{}秒，".format(
                round((computation_time).total_seconds(), 2), t
            ),
            "green",
        )
        print_log(
            "下次运行时间：{}".format(timestamp_end + datetime.timedelta(seconds=t)),
            "green",
        )
        sleep(t)
