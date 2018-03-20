#!/usr/bin/env python3

import imaplib
import os

IMAP = ''
LOGIN = ''
PASSWORD = ''
SAVE_DIR = 'dump'

mbox = imaplib.IMAP4_SSL(IMAP)
status, [msg] = mbox.login(LOGIN, PASSWORD)
print('Login: ', status)

os.makedirs(SAVE_DIR)

folders = [(x.decode('ascii')).split(' "/" ')[1][1:-1] for x in mbox.list()[1]]

for folder in folders:
    print("Processing: ", folder)
    mbox.select(folder)
    status, [msg_ids] = mbox.uid('search', None, 'ALL')

    if status == 'OK':
        os.makedirs(os.path.join(SAVE_DIR, folder))

        for msg_id in msg_ids.split():
            status, msg_parts = mbox.uid('fetch', msg_id, 'RFC822')

            if status == 'OK':
                with open(os.path.join(SAVE_DIR, folder, msg_id.decode('ascii') + '.eml'), 'wb') as _file:
                    _file.write(msg_parts[0][1])

mbox.close()
print('End')
