<template>
    <nav>
        <div class="nav-wrapper teal darken-1">
            <a href="#" class="brand-logo" style="width: 100%; padding-left: 12px">着せ替えMOTO!!</a>

            <ul id="nav-mobile" class="right">
                <li><a class="waves-effect waves-light btn" href="https://tasokori.net" style="padding-left: 6px; padding-right: 6px; font-size: 14px;">ブログトップ</a></li>

            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'HeaderNav',
}
</script>

<style scoped>
nav{
   height: 42px !important;
   line-height: 42px !important;
}
nav .brand-logo{
   font-size: 20px !important;
}

@media screen and (min-width:1024px) {

nav{
   height: 56px !important;
   line-height: 56px !important;
}
nav .brand-logo{
   font-size: 1.9rem !important;
}

}
</style>
