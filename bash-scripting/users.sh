#!/bin/bash

add_user() {
    read -p "Enter username: " username
    read -p "Enter shell (e.g., /bin/bash): " shell
    read -p "Enter home directory (e.g., /home/$username): " home_dir
    read -sp "Enter password: " password
    echo
    read -p "Enter groups (comma-separated, e.g., sudo,users): " groups

    sudo useradd -m -d "$home_dir" -s "$shell" -G "$groups" "$username"
    echo "$username:$password" | sudo chpasswd
    echo "User $username added successfully."
    echo "output: $( cat /etc/passwd | grep $username )"
}

manage_users() {
    read -p "Enter the file with usernames (one per line): " file
    read -p "Do you want to enable or disable users? (enable/disable): " action

    if [[ "$action" == "enable" ]]; then
        while IFS= read -r username; do
            sudo usermod -U "$username"
            echo "User $username enabled."
        done < "$file"
    elif [[ "$action" == "disable" ]]; then
        while IFS= read -r username; do
            sudo usermod -L "$username"
            echo "User $username disabled."
        done < "$file"
    else
        echo "Invalid action specified."
    fi
}

echo "User Management Script"
echo "1. Add a new user"
echo "2. Enable/Disable users"
read -p "Choose an option (1 or 2): " option

case $option in
    1)
        add_user
        ;;
    2)
        manage_users
        ;;
    *)
        echo "Invalid option selected."
        ;;
esac