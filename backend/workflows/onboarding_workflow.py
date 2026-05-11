def create_email_account(employee):

    print(f"""
    Email account created for {employee.name}
    """)


def assign_slack_access(employee):

    print(f"""
    Slack access assigned to {employee.name}
    """)


def create_it_ticket(employee):

    print(f"""
    IT ticket generated for {employee.name}
    """)


def assign_training(employee):

    print(f"""
    Training assigned to {employee.name}
    """)


def send_welcome_message(employee):

    print(f"""
    Welcome email sent to {employee.name}
    """)


# -----------------------------------
# ROLE-SPECIFIC ACCESS FUNCTIONS
# -----------------------------------

def assign_github_access(employee):

    print(f"""
    GitHub access assigned to {employee.name}
    """)


def assign_aws_access(employee):

    print(f"""
    AWS access assigned to {employee.name}
    """)


def assign_jira_access(employee):

    print(f"""
    Jira access assigned to {employee.name}
    """)


def assign_payroll_access(employee):

    print(f"""
    Payroll system access assigned to {employee.name}
    """)


def assign_hrms_access(employee):

    print(f"""
    HRMS access assigned to {employee.name}
    """)


def assign_figma_access(employee):

    print(f"""
    Figma access assigned to {employee.name}
    """)


def assign_adobe_access(employee):

    print(f"""
    Adobe Creative Cloud access assigned to {employee.name}
    """)


# -----------------------------------
# MAIN WORKFLOW ENGINE
# -----------------------------------

def start_onboarding_workflow(employee, db):

    print("""
    Starting onboarding workflow...
    """)

    # COMMON TASKS

    create_email_account(employee)

    assign_slack_access(employee)

    create_it_ticket(employee)

    assign_training(employee)

    # ROLE-BASED LOGIC

    role = employee.role.lower()

    # SOFTWARE ENGINEER

    if role == "software engineer":

        assign_github_access(employee)

        assign_aws_access(employee)

        assign_jira_access(employee)

    # HR

    elif role == "hr":

        assign_payroll_access(employee)

        assign_hrms_access(employee)

    # DESIGNER

    elif role == "designer":

        assign_figma_access(employee)

        assign_adobe_access(employee)

    # DEFAULT

    else:

        print(f"""
        No special access rules for role:
        {employee.role}
        """)

    send_welcome_message(employee)
    employee.onboarding_status = "Completed"

    db.commit()

    db.refresh(employee)
    print("""
    Onboarding workflow completed successfully!
    """)