#!/bin/bash

display_system_info() {
    echo "System Uptime:"
    uptime
    echo

    echo "CPU Load:"
    top -bn1 | grep "load average"
    echo

    echo "Memory Usage:"
    free -h
    echo

    echo "Disk Space Utilization:"
    df -h
    echo
}

generate_process_report() {
    read -p "Sort processes by CPU or Memory usage? (cpu/mem): " sort_by

    if [[ "$sort_by" == "cpu" ]]; then
        ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -n 20 > process_report.txt
        echo "Process report sorted by CPU usage generated: process_report.txt"
    elif [[ "$sort_by" == "mem" ]]; then
        ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head -n 20 > process_report.txt
        echo "Process report sorted by Memory usage generated: process_report.txt"
    else
        echo "Invalid sort option specified."
    fi
}

display_system_info
generate_process_report