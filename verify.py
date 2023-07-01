import sys
input = sys.argv[3]
def check_contain_chinese(check_str):
	for ch in check_str:
		if u'\u4e00' <= ch <= u'\u9f5a':
			pass
		else:
			return True
	return False
#if check_contain_chinese(input):
	#raise Exception('error')
