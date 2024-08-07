
import win32gui # type: ignore
import win32con # type: ignore
import win32api # type: ignore
from tool import *
from windCall import *
import letsgoFarm
import threading
import windCall

def get_all_windows():
    windows_list = []
    # 获取桌面窗口的句柄
    hwnd_desktop = win32gui.GetDesktopWindow()
    # 获取桌面窗口的第一个子窗口句柄
    hwnd = win32gui.GetWindow(hwnd_desktop, win32con.GW_CHILD)
    while hwnd:
        # 获取窗口标题
        window_title = win32gui.GetWindowText(hwnd)
        if window_title:
            windows_list.append((hwnd, window_title))
        hwnd = win32gui.GetWindow(hwnd, win32con.GW_HWNDNEXT)
    return windows_list



 
def get_active_windows():
    # 获取桌面窗口的句柄
    desktop_window = win32gui.GetDesktopWindow()
 
    # 获取桌面窗口的子窗口列表
    window_list = []
    win32gui.EnumChildWindows(desktop_window, lambda hwnd, param: param.append(hwnd), window_list)
 
    active_windows = []
    for hwnd in window_list:
        window_title = win32gui.GetWindowText(hwnd)
        if win32gui.IsWindow(hwnd) and win32gui.IsWindowEnabled(hwnd) and win32gui.IsWindowVisible(hwnd) and window_title != "":
            active_windows.append((hwnd,window_title))
 
    return active_windows

windows = get_active_windows()
for hwnd, window_title in windows:
    print(f'{hwnd}: {window_title}')

def run_letsgoFarm():
    """启动多线程程序"""
    btn_run.config(state="disabled")
    btn_gotofarm.config(state="disabled")
    btn_gotopasture.config(state="disabled")
    btn_gotofishpond.config(state="disabled")
    print_log("启动多线程", "green")
    thread = threading.Thread(target=lambda: letsgoFarm.start())
    thread.daemon = True
    thread.start()


def btn_farm():
    windCall.press("k")
    windCall.press("k")
    windCall.press("k")
    windCall.press("k")
    windCall.press("k")
    print_log("请在3秒内点击游戏画面", "green")
    thread = threading.Thread(target=lambda: go_to_farm())
    thread.daemon = True
    thread.start()


def btn_pasture():
    print_log("请在3秒内点击游戏画面", "green")
    thread = threading.Thread(target=lambda: go_to_pasture())
    thread.daemon = True
    thread.start()


def btn_fishpond():
    print_log("请在3秒内点击游戏画面", "green")
    thread = threading.Thread(target=lambda: go_to_fishpond())
    thread.daemon = True
    thread.start()

# 创建一个窗口并设置窗口的标题
window = create_window("星宝农场自动化")


# 创建一个列表框，第一行
create_listbox()

# 创建一个进度条，第二行
create_progressbar()

# 创建三个按钮，前往农场，前往牧场，前往鱼塘，第三行
btn_gotofarm = create_button("前往农场", 2, 0)
btn_gotofarm.config(command=lambda: btn_farm())
btn_gotopasture = create_button("前往牧场", 2, 1)
btn_gotopasture.config(command=lambda: btn_pasture())
btn_gotofishpond = create_button("前往鱼塘", 2, 2)
btn_gotofishpond.config(command=lambda: btn_fishpond())
ipt_hwnd = create_input(3,2)
# 创建两个按钮，启动和退出，第四行
btn_run = create_button("开始挂机", 3, 0)
btn_run.config(command=lambda: run_letsgoFarm())
btn_quit = create_button("退出", 3, 1)
btn_quit.config(command=window.quit)


# 置顶窗口
window.attributes("-topmost", True)
# 设置窗口大小不可改变
window.resizable(False, False)
# 启动事件循环
window.mainloop()

# win32api.mouse_event(win32con.MOUSEEVENTF_MOVE, 100, 50)
# print("窗口创建成功")
# # 获取窗口句柄
# hwnd = win32gui.FindWindow(None, '窗口标题')
# # 发送消息，例如按下回车键
# win32gui.SendMessage(hwnd, win32con.WM_KEYDOWN, win32con.VK_RETURN, 0)
 