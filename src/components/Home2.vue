<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <side-bar2></side-bar2>

        <!-- Page Content  -->
        <div id="content">

<!--            <nav class="navbar navbar-expand-lg navbar-light bg-light">-->
<!--                <div class="container-fluid">-->

<!--                    <button type="button" id="sidebarCollapse" class="btn text-sidebar bg-turbo-yellow">-->
<!--                        <i class="fas fa-align-left"></i>-->
<!--                        <span></span>-->
<!--                    </button>-->
<!--                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
<!--                        <i class="fas fa-align-justify"></i>-->
<!--                    </button>-->

<!--                    <div class="collapse navbar-collapse" id="navbarSupportedContent">-->
<!--                        <ul class="nav navbar-nav ml-auto">-->
<!--                            <li class="nav-item active">-->
<!--                                <a class="nav-link" href="#">Page</a>-->
<!--                            </li>-->
<!--                            <li class="nav-item">-->
<!--                                <a class="nav-link" href="#">Page</a>-->
<!--                            </li>-->
<!--                            <li class="nav-item">-->
<!--                                <a class="nav-link" href="#">Page</a>-->
<!--                            </li>-->
<!--                            <li class="nav-item">-->
<!--                                <a class="nav-link" href="#">Page</a>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </nav>-->
            <navBar></navBar>

<!--            <h2>Collapsible Sidebar Using Bootstrap 4</h2>-->
<!--            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
<!--            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->

<!--            <div class="line"></div>-->

<!--            <h2>Lorem Ipsum Dolor (1)</h2>-->
<!--            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->

<!--            <div class="line"></div>-->

<!--            <h2>Lorem Ipsum Dolor (2)</h2>-->
<!--            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->

<!--            <div class="line"></div>-->

<!--            <h3>Lorem Ipsum Dolor (3)</h3>-->
<!--            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
        </div>
    </div>
</template>

<script>
  import sideBar2 from "./sideBar2";
  import navBar from "./navBar";
  export default {
    name: "Home2",
    components: {sideBar2: sideBar2,
    navBar:navBar}
  }
</script>

<style scoped>

    body {
        font-family: 'Oswald';
        background: #fafafa;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }

    a,
    a:hover,
    a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    .navbar {
        padding: 15px 10px;

        border: none;
        border-radius: 0;
        margin-bottom: 40px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    }

    .navbar-btn {
        box-shadow: none;
        outline: none !important;
        border: none;
    }

    .line {
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed #ddd;
        margin: 40px 0;
    }

    /* ---------------------------------------------------
        SIDEBAR STYLE
    ----------------------------------------------------- */

    $lila : $turbo-yellow /*#7386D5*/;
    $lila-60 : $turbo-yellow-60 /*#6d7fcc*/;
    $lila-line : $turbo-yellow-70 /*#47748b*/;

    $text-sidebar : #6b6b6b /*#fff*/;
    $text-sidebar-hover : #6b6b6b /*#fff*/;

    .text-sidebar {
        color: $text-sidebar;
    }

    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
    }

    #sidebar {
        min-width: 100px;
        max-width: 100px;
        background: $lila;
        color: $text-sidebar;
        transition: all 0.3s;
    }

    #sidebar.active {
        margin-left: -250px;
    }

    #sidebar .sidebar-header {
        padding: 20px;
        background:$lila-60 /*#6d7fcc*/;
    }

    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid $lila-line;
    }

    #sidebar ul p {
        color: $text-sidebar;
        padding: 10px;
    }

    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }

    #sidebar ul li a:hover {
        color: $lila;
        background: $text-sidebar-hover;
    }

    #sidebar ul li.active>a, a[aria-expanded="true"] {
        color: $text-sidebar;
        background: $lila-60;
    }

    a[data-toggle="collapse"] {
        position: relative;
    }

    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }

    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        background: $lila-60;
    }

    ul.CTAs {
        padding: 20px;
    }

    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    a.download {
        background: $text-sidebar;
        color: $lila;
    }

    a.article,
    a.article:hover {
        background: $lila-60 !important;
        color: $text-sidebar !important;
    }

    /* ---------------------------------------------------
        CONTENT STYLE
    ----------------------------------------------------- */

    #content {
        width: 100%;
        padding: 20px;
        min-height: 100vh;
        transition: all 0.3s;
        /*background:blue;*/
    }

    /* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */

    @media (max-width: 768px) {
        #sidebar {
            margin-left: -250px;
        }
        #sidebar.active {
            margin-left: 0;
        }
        #sidebarCollapse span {
            display: none;
        }
    }
</style>